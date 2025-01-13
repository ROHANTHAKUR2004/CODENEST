import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaFolderOpen } from "react-icons/fa";
import { Fileicon } from "../atoms/EditorTabsButton/FileIcon/Fileicon";
import "./TreeNode.css"; 
import { useEditorSocketStore } from "../../store/EditorSocket";
import { useFileContextMenuStore } from "../../store/fileContextMenuStore";
import { useFolderContextMenuStore } from "../../store/folderContextMenu";

export const TreeNode = ({ filefolderData }) => {
  const [visibility, setVisibility] = useState({});
  const { editorsocket } = useEditorSocketStore();
  
  const {
    setFile,
    setIsopen: setFileContextMenuIsOpen,
    setX: setFileContextX,
    setY: setFileContextY
  } = useFileContextMenuStore();

  const {
    setFolder,
    setIsOpen: setFolderContextMenuIsOpen,
    setX: setFolderContextX,
    setY: setFolderContextY,
  } = useFolderContextMenuStore();
  

  const toggleVisibility = (name) => {
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const computeExtension = (filefolderData) => {
    const name = filefolderData.name.split(".");
    return name[name.length - 1];
  };

  function handleDoubleClickFile(filefolderData) {
    editorsocket.emit("readFile", {
      pathToFileorFlder: filefolderData.path
    });
  }

  function handleContextMenuForFile(e, path) {
    e.preventDefault();
    setFile(path);
    setFileContextX(e.clientX);
    setFileContextY(e.clientY);
    setFileContextMenuIsOpen(true);
  }

  
  function handleContextMenuForFolder(e, path) {
    e.preventDefault();
    setFolder(path);
    setFolderContextX(e.clientX);
    setFolderContextY(e.clientY);
    setFolderContextMenuIsOpen(true);
  }
  return (
    filefolderData && (
      <div className="tree-node">
        {filefolderData.children ? (
          <button
            className="tree-node-folder"
            onClick={() => toggleVisibility(filefolderData.name)}
            onContextMenu={(e) => handleContextMenuForFolder(e, filefolderData.path)}
          >
            <span className="tree-node-icon">
              {visibility[filefolderData.name] ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </span>
            <FaFolderOpen className="folder-icon" />
            <span>{filefolderData.name}</span>
          </button>
        ) : (
          <div
            className="tree-node-file"
            onContextMenu={(e) => handleContextMenuForFile(e, filefolderData.path)}
            onDoubleClick={() => handleDoubleClickFile(filefolderData)}
          >
            <Fileicon extension={computeExtension(filefolderData)} />
            <span className="file-name">{filefolderData.name}</span>
          </div>
        )}
        {visibility[filefolderData.name] &&
          filefolderData.children &&
          filefolderData.children.map((child) => (
            <TreeNode filefolderData={child} key={child.name} />
          ))}
      </div>
    )
  );
};
