import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FaFolderOpen } from "react-icons/fa";
import { Fileicon } from "../atoms/EditorTabsButton/FileIcon/Fileicon";
import "./TreeNode.css"; 
import { useEditorSocketStore } from "../../store/EditorSocket";
import { useFileContextMenuStore } from "../../store/fileContextMenuStore";

export const TreeNode = ({ filefolderData }) => {

  const [visibility, setVisibility] = useState({});

  const { editorsocket} = useEditorSocketStore();
      
  const {
   setFile,
   setIsopen : setfileContextMenuisopen ,
   setX : setfileContextX,
   setY : setfileContextY
    }  = useFileContextMenuStore();
 
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

  function handledoubleclick(filefolderData){
     editorsocket.emit("readFile", {
      pathToFileorFlder : filefolderData.path
     })
  }

  function handleContextMenuForFiles(e, path){
       e.preventDefault();
       console.log("right clicked", path);
       setFile(path);
       setfileContextX(e.clientX);
       setfileContextY(e.clientY);
       setfileContextMenuisopen(true);
  }


  return (
    filefolderData && (
      <div className="tree-node">
        {filefolderData.children ? (
          <button
            className="tree-node-folder"
            onClick={() => toggleVisibility(filefolderData.name)}
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
          <div className="tree-node-file"
            onContextMenu={(e) => handleContextMenuForFiles(e,filefolderData.path)}
            onDoubleClick={() => handledoubleclick(filefolderData)}>
            <Fileicon extension={computeExtension(filefolderData)} />
            <span 
            
            className="file-name">{filefolderData.name}
            </span>
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
