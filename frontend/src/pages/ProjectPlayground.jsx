import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/Editor";
import { EditorButton } from "../components/atoms/EditorTabsButton/EditorButton";
import { Treestructure } from "../components/organisms/treeStructure/treestructure";

export const ProjectPlayground = () => {
  const { projectId } = useParams();

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
      <div style={styles.editor}>
        <EditorComponent />
        <div style={styles.buttons}>
          <EditorButton isActive={true} />
          <EditorButton isActive={false} />
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
  projectId: {
    color: "#d4d4d4",
    fontSize: "14px",
    marginBottom: "10px",
  },
  editor: {
    flex: 1, // Take up remaining space
    backgroundColor: "#1e1e1e",
    padding: "10px",
    color: "#d4d4d4",
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
};
