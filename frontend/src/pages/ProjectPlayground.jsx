import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/Editor";
import { EditorButton } from "../components/atoms/EditorTabsButton/EditorButton";
import { Treestructure } from "../components/organisms/treeStructure/treestructure";

export const ProjectPlayground = () => {

   const {projectId} =  useParams(); 

    return (
    <>
    projectid :  { projectId}
    <EditorComponent/>
    <EditorButton isActive={true}/>
    <EditorButton isActive={false}/>
    <Treestructure/>
    </>
)
}