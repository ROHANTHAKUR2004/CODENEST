import express from 'express';
import { PORT } from './config/serverconfig.js';

import cors from 'cors';
import apirouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/api', apirouter);


app.listen(PORT, ()=>{
    console.log(`Server runnnig on ${PORT}`);
})
