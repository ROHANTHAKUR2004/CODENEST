import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import { handlecontainercreate } from './containers/handlecontainerscreate.js';
import { WebSocketServer } from 'ws';
import { handleterminalCreation } from './containers/handleterminalCreation.js';



const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
     
server.listen(4000, ()=>{
    console.log(`Server runnnig on 4000`);
    console.log(process.cwd())
})

const websocketterminal = new WebSocketServer({
    server
})

      
 websocketterminal.on("connection",  async (ws, req, container) => {
        console.log("terminal connected");
       const isTerminal = req.url.includes("/terminal");

     if(isTerminal){
         console.log("req url " ,req.url);
         const projectId = req.url.split("=")[1];
         console.log("projectid", projectId )
        const container =  await handlecontainercreate(projectId, websocketterminal);

          handleterminalCreation(container, ws);
     }
})

