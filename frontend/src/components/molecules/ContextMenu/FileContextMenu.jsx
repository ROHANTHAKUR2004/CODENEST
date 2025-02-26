import { useState, useRef, useEffect } from "react";
import { useEditorSocketStore } from "../../../store/EditorSocket";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export const FileContextMenu = ({ x, y, path }) => {
  const { setIsopen } = useFileContextMenuStore();
  const { editorsocket } = useEditorSocketStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const inputRef = useRef(null);

  const pathParts = path.split("\\"); 
  const currentFileName = pathParts[pathParts.length - 1]; 

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus(); 
    }
  }, [isRenaming]);

  function handleFileDelete(e) {
    e.preventDefault();
    console.log("Deleting file:", path);
    editorsocket.emit("deleteFile", {
      pathToFileorFlder: path,
    });
    setIsopen(false);
  }

  function handleRenameClick(e) {
    e.preventDefault();
    setIsRenaming(true);
    setNewFileName(currentFileName);
  }

  function handleRenameSubmit(e) {
    e.preventDefault();

 
    if (!newFileName.trim() || newFileName.trim() === currentFileName) {
      console.log("Rename cancelled or no changes made.");
      setIsRenaming(false);
      return;
    }


    pathParts[pathParts.length - 1] = newFileName.trim();
    const newPath = pathParts.join("\\");

    console.log("Renaming file from:", path, "to:", newPath);

   
    editorsocket.emit("rename", {
      oldPath: path,
      newPath: newPath,
    });

    setIsRenaming(false);
    setIsopen(false);
  }

  function handleCancelRename() {
    setIsRenaming(false);
  }

  return (
    <>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          backgroundColor: isRenaming ? "#f9fafb" : "transparent",
          border: isRenaming ? "1px solid #e2e8f0" : "none",
          borderRadius: "4px",
          position: "relative",
        }}
      >
        {isRenaming ? (
          <form onSubmit={handleRenameSubmit} style={{ width: "100%" }}>
            <input
              ref={inputRef}
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onBlur={handleCancelRename}
              onKeyDown={(e) => {
                if (e.key === "Escape") handleCancelRename(); 
              }}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "14px",
                padding: "4px 8px",
                borderRadius: "4px",
                background: "white",
                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            />
          </form>
        ) : (
          <span
            style={{
              fontSize: "14px",
              color: "#2d3748",
              cursor: "pointer",
              width: "100%",
              wordBreak: "break-all",
            }}
            onDoubleClick={handleRenameClick} 
          >
            {currentFileName}
          </span>
        )}
      </div>

      {!isRenaming && (
        <div
          onMouseLeave={() => setIsopen(false)}
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
            onClick={handleRenameClick}
            onMouseEnter={(e) => (e.target.style.background = "#f1f5f9")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            ✏️ Rename File
          </button>
        </div>
      )}
    </>
  );
};
