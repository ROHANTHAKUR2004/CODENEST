import express from 'express';
import { PORT } from './config/serverconfig.js';

import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/hi', (req, res) =>{
    return res.json({message: 'hello'});
})


app.listen(PORT, ()=>{
    console.log(`Server runnnig on ${PORT}`);
})
