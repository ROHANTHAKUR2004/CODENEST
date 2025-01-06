import { useParams } from "react-router-dom";
import { usetreeStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";

export const Treestructure = () => {

         const {treeStructure , settreeStructure} = usetreeStore();

          const {projectId} = useParams();      

          useEffect(() =>{
            if(treeStructure){
                console.log("path try", treeStructure)
            }else{
                settreeStructure(projectId);
            } 
          },[projectId, settreeStructure, treeStructure])

  return (
    <div>treestructure</div>
  )
}
