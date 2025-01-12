import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/Editor";
import { EditorButton } from "../components/atoms/EditorTabsButton/EditorButton";
import { useEditorSocketStore } from "../store/EditorSocket";
import { useEffect } from "react";

import {io} from "socket.io-client";
import { Treestructure } from "../components/organisms/treeStructure/Treestructure";

export const ProjectPlayground = () => {
  const { projectId } = useParams();
  const { seteditorSocket } = useEditorSocketStore();

  useEffect(() => {
    const editorsocketconn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: {
        projectId: projectId,
      },
    });
    seteditorSocket(editorsocketconn);
  }, [projectId, seteditorSocket]);

  return (
    <div style={styles.container}>
      {/* Sidebar for TreeStructure */}
      <div style={styles.sidebar}>
        {projectId && (
          <>
            <Treestructure />
          </>
        )}
      </div>

      {/* Main Editor Section */}
      <div style={styles.editorContainer}>
        {/* Buttons like VS Code Tabs */}
        <div style={styles.buttons}>
          <EditorButton />
        </div>

        {/* Main Editor */}
        <div style={styles.editor}>
          <EditorComponent />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh", // Full viewport height
    backgroundColor: "#1e1e1e", // VS Code-like dark theme
  },
  sidebar: {
    backgroundColor: "#252526", // Dark sidebar color
    minWidth: "200px",
    maxWidth: "300px",
    width: "15%", // 15% of the total width
    height: "100%", // Full height
    overflowY: "auto",
    padding: "10px",
    boxSizing: "border-box",
  },
  editorContainer: {
    flex: 1, // Take up remaining space
    display: "flex",
    flexDirection: "column", // Stack buttons above editor
    backgroundColor: "#1e1e1e",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    backgroundColor: "#333333", // Darker background for the button bar
    padding: "2px 10px",
    alignItems: "center",
    borderBottom: "1px solid #444", // Separator line like VS Code
  },
  editor: {
    flex: 1, // Take up the remaining space
    padding: "0px",
    color: "#d4d4d4",
    overflowY: "auto",
  },
};
