import { Route, Routes } from "react-router-dom"
import Createproject from "../pages/CreateProject"
import { ProjectPlayground } from "../pages/ProjectPlayground"


export const MainRoutes = () => {
    return (
    <Routes> 
     <Route path="/" element={<Createproject/>}/>
      <Route path="/project/:projectId" element={<ProjectPlayground/>} />
   </Routes>
    )
}