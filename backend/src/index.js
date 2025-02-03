import express from 'express';
import { PORT } from './config/serverconfig.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';
import apirouter from './routes/index.js';
import chokidar from 'chokidar';
import { handleEditorSocketEvents } from './SocketHnadlers/EditorHandler.js';
import { handlecontainercreate } from './containers/handlecontainerscreate.js';

import { WebSocketServer } from 'ws';
import { handleterminalCreation } from './containers/handleterminalCreation.js';



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
 
const editorNamespace = io.of('/editor');
editorNamespace.on("connection", (socket) => {
       console.log("Editor Connected");
        
        let projectId = socket.handshake.query['projectId'];
           if(projectId){
                var watcher = chokidar.watch(`./projects/${projectId}`, {
                    ignored : (path) => path.includes("node_modules"),
                    persistent : true ,
                    awaitWriteFinish : {
                        stabilityThreshold : 2000,
                        pollInterval : 100
                    },
                    ignoreInitial : true
                });

                watcher.on("all", (event , path) => {
                      console.log(" chokidar watcher", path , event);
                });
           }

            handleEditorSocketEvents(socket, editorNamespace);

            //  socket.on("disconnect", async () => {
            //     await watcher.close();
            //     console.log("editor disconnected");

            //  });
});


server.listen(PORT, ()=>{
    console.log(`Server runnnig on ${PORT}`);
})


const websocketterminal = new WebSocketServer({
    noServer : true,
})

server.on("upgrade", (req, tcpsocket, head) =>{
      
    const isTerminal = req.url.includes("/terminal");

    if(isTerminal){
        console.log("req url " ,req.url);
        const projectId = req.url.split("=")[1];
        console.log("projectid", projectId )

        handlecontainercreate(projectId, websocketterminal, req, tcpsocket, head)
    }
})

websocketterminal.on("connection", (ws, req, container) => {
    console.log("terminal connected");
    handleterminalCreation(container, ws);
    ws.on("close", () => {
        container.remove({force : true}, (err, data) => {
            if(err){
                console.log("error while reomving container", err);
            }
            console.log("dta of container removed", data );
        });
    })
})