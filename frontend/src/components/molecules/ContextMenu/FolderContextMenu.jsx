import { useState, useRef, useEffect } from "react";
import { useFolderContextMenuStore } from "../../../store/folderContextMenu";
import { useEditorSocketStore } from "../../../store/EditorSocket";

export const FolderContextMenu = ({ x, y, path }) => {
  const { setIsOpen } = useFolderContextMenuStore();
  const { editorsocket } = useEditorSocketStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const inputRef = useRef(null);

  const pathParts = path.split("\\");
  const currentFolderName = pathParts[pathParts.length - 1];

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  function handleFolderDelete(e) {
    e.preventDefault();
    console.log("Deleting folder:", path);
    editorsocket.emit("deleteFolder", { pathToFolder: path });
    setIsOpen(false);
  }

  function handleRenameClick(e) {
    e.preventDefault();
    setIsRenaming(true);
    setNewFolderName(currentFolderName);
  }

  function handleRenameSubmit(e) {
    e.preventDefault();
    if (!newFolderName.trim() || newFolderName.trim() === currentFolderName) {
      console.log("Rename cancelled or no changes made.");
      setIsRenaming(false);
      return;
    }

    pathParts[pathParts.length - 1] = newFolderName.trim();
    const newPath = pathParts.join("\\");
    console.log("Renaming folder from:", path, "to:", newPath);

    editorsocket.emit("renameFolder", { oldPath: path, newPath: newPath });
    setIsRenaming(false);
    setIsOpen(false);
  }

  function handleCancelRename() {
    setIsRenaming(false);
  }

  function handleCreateFile(e) {
    e.preventDefault();
    const fileName = prompt("Enter new file name:");
    if (fileName) {
      const filePath = `${path}\\${fileName}`;
      console.log("Creating file at:", filePath);
      editorsocket.emit("createFile", { filePath });
    }
    setIsOpen(false);
  }

  function handleCreateFolder(e) {
    e.preventDefault();
    const folderName = prompt("Enter new folder name:");
    if (folderName) {
      const folderPath = `${path}\\${folderName}`;
      console.log("Creating folder at:", folderPath);
      editorsocket.emit("createFolder", { folderPath });
    }
    setIsOpen(false);
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
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
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
            {currentFolderName}
          </span>
        )}
      </div>

      {!isRenaming && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          style={{
            width: "160px",
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
            style={menuButtonStyle}
            onClick={handleFolderDelete}
          >
            🗑️ Delete Folder
          </button>
          <button
            style={menuButtonStyle}
            onClick={handleRenameClick}
          >
            ✏️ Rename Folder
          </button>
          <button
            style={menuButtonStyle}
            onClick={handleCreateFile}
          >
            📄 Create File
          </button>
          <button
            style={menuButtonStyle}
            onClick={handleCreateFolder}
          >
            📂 Create Folder
          </button>
        </div>
      )}
    </>
  );
};

const menuButtonStyle = {
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
};
