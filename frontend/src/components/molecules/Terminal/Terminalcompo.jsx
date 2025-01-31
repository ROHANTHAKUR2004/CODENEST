import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
import {io} from "socket.io-client";
import { useParams } from "react-router-dom";


export const Terminalcompo = () => {

    const terminalRef = useRef(null);

    const socket = useRef(null);
    const { projectId } = useParams();

    useEffect(() => {
         const term = new Terminal({
          cursorBlink : true,
          theme : {
            background: "#282a37",
            foreground: "#f8f8f3",
            cursor: "#f8f8f3",
            cursorAccent: "#282a37",
            red: "#ff5544",
            green: "#50fa7c",
            yellow: "#f1fa8c",
            cyan: "#8be9fd",
          },
          fontSize: 16,
          fontFamily: "Fira Code",
          convertEol: true,
         });

        term.open(terminalRef.current);
        let fitaddon = new FitAddon();
        term.loadAddon(fitaddon);
        fitaddon.fit();   



        socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
          query : {
             projectId : projectId,
          }
        });

        socket.current.on("shell-output", (data) => {
          term.write(data);
        })
         
        term.onData((data) =>{
            console.log(" terminal dta",data);
            socket.current.emit("shell-input" , data)
        });

        return () => {
            term.dispose();
            socket.current.disconnect();
        }

    }, [])

    return (
        <div
         ref={terminalRef} 
         style={{
          width : '100%',
         }}
          className='terminal'
          id="terminal-container"
        >

        </div>
    );
  };
  