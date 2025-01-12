import { useParams } from "react-router-dom";
import { usetreeStore } from "../../../store/treeStructureStore";
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu";

export const Treestructure = () => {
  const { treeStructure, settreeStructure } = usetreeStore();
  const { projectId } = useParams();

   const {
    file,
    isOpen : isfileContextopen ,
     x : fileContextX,
     y : fileContextY
    }  = useFileContextMenuStore();
  
  
    useEffect(() => {
    if (treeStructure) {
      console.log("")
    } else {
      settreeStructure(projectId); // Fetch tree structure based on project ID
    }
  }, [projectId, settreeStructure, treeStructure]);

  return (
       <>
        {isfileContextopen && fileContextX && fileContextY && (
          <FileContextMenu 
            x = {fileContextX}
            y = {fileContextY}
            path = {file}
          />
        )}
        <TreeNode filefolderData={treeStructure} />
        </>
       
      
   
  );
};
