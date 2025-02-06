
import { useportstore } from "../../../store/portstore";
import { useEffect, useRef } from "react";
import { Input, Row } from "antd";
import { useEditorSocketStore } from "../../../store/EditorSocket";
import { ReloadOutlined } from "@ant-design/icons";

export const  Browser = ({projectId}) => {

    const { port} = useportstore();

    const browserref = useRef(null);

    const {editorsocket } = useEditorSocketStore();

    function handlerefresh() {
        if (browserref.current) {
          console.log("Refreshing browser content");
          const oldSrc = browserref.current.src;
          browserref.current.src = ""; 
          setTimeout(() => {
            browserref.current.src = oldSrc; 
          }, 0);
        }
      }
      

      useEffect(() => {
          if(!port){
             editorsocket?.emit("getPort" , {
                containername : projectId
             })
          }
      },[port, editorsocket]);
 
      if(!port){
        return <div
          style={{
            backgroundColor : 'whitesmoke'
          }}
        >Loading..</div>
      }

      return (
           <Row
           style={{
            backgroundColor: "#22212b"
        }}>
       
            <Input
                 style={{
                    width: "100%",
                    height: "30px",
                    color: "white",
                    fontFamily: "Fira Code",
                    backgroundColor: "#282a35",
                }}
                prefix={<ReloadOutlined onClick={handlerefresh}/>}
                defaultValue={`http://localhost:${port}`}       
            />

            <iframe
               ref={browserref}
               src={`http://localhost:${port}`}
               style={{
                width: "100%",
                height: "95vh",
                border: "none"
            }}

            />

           </Row>
      )

};