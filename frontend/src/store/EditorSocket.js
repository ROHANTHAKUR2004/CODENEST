import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFiletabStore";
import { usetreeStore } from "./treeStructureStore";
import { useportstore } from "./portstore";
//import { usetreeStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) =>({
   
    editorsocket : null ,
    seteditorSocket : (incomingSocket) => {

        const activefileTabSetter = useActiveFileTabStore.getState().setactiveFiletab;
        const projectTreeStructureSetter = usetreeStore.getState().settreeStructure;
         const portsetter = useportstore.getState(). setport;

        incomingSocket?.on("readFileSuccess", (data) => {
             const fileextension = data.path.split('.').pop();
                activefileTabSetter(data.path, data.value, fileextension )
             });

             incomingSocket?.on("writeFileSuccess", (data) => {
               console.log("write file succes", data);
            //    incomingSocket.emit("readFile", {
            //     pathToFileorFlder : data.path
            //    })
             });

             incomingSocket?.on("deleteFileSuccess", () => {
                console.log("delet file succes");
                projectTreeStructureSetter();
             });

             incomingSocket?.on("renameSuccess", () => {
                console.log("rename file succes");
                projectTreeStructureSetter();
             });

             incomingSocket?.on("deleteFolderSuccess", () => {
               console.log("deleting folder response ");
               projectTreeStructureSetter();
             });

             incomingSocket?.on("createFolderSuccess", () => {
               console.log("create folder response ");
               projectTreeStructureSetter();
             });

             incomingSocket?.on("createFileSuccess", () => {
               console.log("crete file response socket ");
               projectTreeStructureSetter();
             });

             incomingSocket?.on("getportsucess" , ({port}) => {
                 console.log("port is", port);
                 portsetter(port);
             })
        
      
          set ({
              editorsocket : incomingSocket 
          })
    }
}));