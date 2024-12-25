import usePing from "./hooks/apis/query/usePing";

function App() {


   const {isLoading, data} =   usePing();

   if(isLoading){
    return (
      <>
       loading...
      </>
    )
   }
  return (
    <>
     hellollllll {data.message}
    
    </>
  )
}

export default App;
