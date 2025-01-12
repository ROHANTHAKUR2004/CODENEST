import { useEditorSocketStore } from "../../../store/EditorSocket";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export const FileContextMenu = ({ x, y, path }) => {
  const { setIsopen } = useFileContextMenuStore();
  const { editorsocket }   = useEditorSocketStore();


  function handleFileDelete(e) {
    e.preventDefault();
    console.log("Deleting file:", path);
     editorsocket.emit("deleteFile", {
        pathToFileorFlder : path
     })
  }

  function handleRename(e) {
    e.preventDefault();
    console.log("Renaming file:", path);
    ; 
  }

  return (
    <div
      onMouseLeave={() => {
        setIsopen(false);
      }}
      style={{
        width: "140px",
        position: "fixed",
        left: x,
        top: y,
        border: "1px solid #e2e8f0",
        background: "white",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        borderRadius: "8px",
        padding: "8px 0",
        fontFamily: "'Inter', sans-serif",
        animation: "fadeIn 0.2s ease-in-out",
      }}
    >
      <button
        style={{
          display: "block",
          width: "100%",
          padding: "10px 16px",
          textAlign: "left",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "14px",
          color: "#2d3748",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
        onClick={handleFileDelete}
        onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
        onMouseLeave={(e) => (e.target.style.background = "transparent")}
      >
        🗑️ Delete File
      </button>
      <button
        style={{
          display: "block",
          width: "100%",
          padding: "10px 16px",
          textAlign: "left",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "14px",
          color: "#2d3748",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
        onClick={handleRename}
        onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
        onMouseLeave={(e) => (e.target.style.background = "transparent")}
      >
        ✏️ Rename File
      </button>
    </div>
  );
};
