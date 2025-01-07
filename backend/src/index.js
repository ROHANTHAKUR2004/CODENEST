import express from 'express';
import { PORT } from './config/serverconfig.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';
import apirouter from './routes/index.js';

const app = express();
const server = createServer(app);
const io = new Server(server , {
    cors : {
        origin : '*',
        methods : ['GET', 'POST']
    }
});


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', apirouter);
 
io.on('connection', (socket) => {
    console.log('a user connected from socket');
});


server.listen(PORT, ()=>{
    console.log(`Server runnnig on ${PORT}`);
})
