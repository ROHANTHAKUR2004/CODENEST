import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFiletabStore";

export const useEditorSocketStore = create((set) =>({
   
    editorsocket : null ,
    seteditorSocket : (incomingSocket) => {

        const activefileTabSetter = useActiveFileTabStore.getState().setactiveFiletab;

        incomingSocket?.on("readFileSuccess", (data) => {
                activefileTabSetter(data.path, data.value, )
             });

             incomingSocket?.on("writeFileSuccess", (data) => {
               console.log("write file succes", data);
            //    incomingSocket.emit("readFile", {
            //     pathToFileorFlder : data.path
            //    })
             });
        
          
          set ({
              editorsocket : incomingSocket 
          })
    }
}));