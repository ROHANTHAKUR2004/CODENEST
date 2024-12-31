import { Route, Routes } from "react-router-dom";
import { Createproject } from "./pages/CreateProject";


function App() {
  return (
   <Routes> 
    <Route path="/" element={<Createproject/>}/>
   </Routes>
  )
}

export default App;
