import express from 'express';
import { PORT } from './config/serverconfig.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import cors from 'cors';
import apirouter from './routes/index.js';
import chokidar from 'chokidar';
import { handleEditorSocketEvents } from './SocketHnadlers/EditorHandler.js';
import { handlecontainercreate } from './containers/handlecontainerscreate.js';

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
          console.log("project id revecived from frontend", projectId);
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

const terminalNamespace = io.of('/terminal');
terminalNamespace.on("connection", (socket) =>{
    console.log("TERMINAL CONNECTED");
    let projectId = socket.handshake.query['projectId'];

    socket.on("shell-input", (data) =>{
        console.log("input recevived", data);
        terminalNamespace.emit("shell-output", data);
    })

    socket.on("disconnect" , () => {
        console.log("terminal disconnected");
    })

    handlecontainercreate(projectId,socket);
});




server.listen(PORT, ()=>{
    console.log(`Server runnnig on ${PORT}`);
})
