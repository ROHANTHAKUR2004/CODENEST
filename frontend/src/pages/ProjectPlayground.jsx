import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/Editor";
import { EditorButton } from "../components/atoms/EditorTabsButton/EditorButton";
import { useEditorSocketStore } from "../store/EditorSocket";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Treestructure } from "../components/organisms/treeStructure/Treestructure";
import { Terminalcompo } from "../components/molecules/Terminal/Terminalcompo";
import { useterminalsocketstore } from "../store/terminalsocketstore";
import { Browser } from "../components/organisms/browser/Browser";
import { Button } from "antd";
import { Allotment } from "allotment"; 

import "allotment/dist/style.css";
import "../styles/ProjectPlayground.css"; 

export const ProjectPlayground = () => {
  const { projectId } = useParams();
  const { seteditorSocket } = useEditorSocketStore();
  const { terminalsocket, setterminalsocket } = useterminalsocketstore();
  const [loadbrowser, setloadbrowser] = useState(false);

  useEffect(() => {
    const editorsocketconn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: {
        projectId: projectId,
      },
    });
    try {
      const ws = new WebSocket("ws://localhost:4000/terminal?projectId=" + projectId);
      setterminalsocket(ws);
    } catch (error) {
      console.log(error);
    }
    seteditorSocket(editorsocketconn);
  }, [projectId, seteditorSocket, setterminalsocket]);

  return (
    <div className="container">
      <div className="sidebar">{projectId && <Treestructure />}</div>

      <div className="mainContent">
        <Allotment>
          <Allotment.Pane minSize={200} className="editorPane">
            <div className="editorContainer">
              <div className="loadBrowserButtonContainer">
                <Button onClick={() => setloadbrowser((prev) => !prev)}>
                  {loadbrowser ? "Close Browser" : "Load Browser"}
                </Button>
              </div>

              <div className="buttons">
                <EditorButton />
              </div>

              <div className="editor">
                <EditorComponent />
              </div>

              <div className="terminal">
                <Terminalcompo />
              </div>
            </div>
          </Allotment.Pane>

          {loadbrowser && (
            <Allotment.Pane minSize={300} snap className="browserPane">
              <div className="browserContainer">
                {projectId && terminalsocket && <Browser projectId={projectId} />}
              </div>
            </Allotment.Pane>
          )}
        </Allotment>
      </div>
    </div>
  );
};
