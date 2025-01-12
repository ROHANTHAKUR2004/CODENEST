import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFiletabStore";
import { usetreeStore } from "./treeStructureStore";
//import { usetreeStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) =>({
   
    editorsocket : null ,
    seteditorSocket : (incomingSocket) => {

        const activefileTabSetter = useActiveFileTabStore.getState().setactiveFiletab;
        const projectTreeStructureSetter = usetreeStore.getState().settreeStructure;

        incomingSocket?.on("readFileSuccess", (data) => {
                activefileTabSetter(data.path, data.value, )
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
        
          
          set ({
              editorsocket : incomingSocket 
          })
    }
}));