import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { useEffect, useRef } from "react";
//import { useParams } from "react-router-dom";
import { useterminalsocketstore } from "../../../store/terminalsocketstore";
import { AttachAddon } from "@xterm/addon-attach";

export const Terminalcompo = () => {

    const terminalRef = useRef(null);
    const {terminalsocket} = useterminalsocketstore();


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

   
       if(terminalsocket){
        terminalsocket.onopen = () => {
          const attachaddon  = new AttachAddon(terminalsocket);
          term.loadAddon(attachaddon);
       }
       }

       
        return () => {
            term.dispose();
            terminalsocket?.close();
        }

    }, [terminalsocket]) 

    return (
        <div
         ref={terminalRef} 
          style={{
            width: "99%", // Ensure terminal uses 80% width
            maxWidth: "100%",
          }}
          className='terminal'
          id="terminal-container"
        >
       
        </div>
    );
  };
  