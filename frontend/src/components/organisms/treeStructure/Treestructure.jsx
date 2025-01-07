import { useParams } from "react-router-dom";
import { usetreeStore } from "../../../store/treeStructureStore";
import { useEffect } from "react";
import { TreeNode } from "../../molecules/TreeNode";

export const Treestructure = () => {
  const { treeStructure, settreeStructure } = usetreeStore();
  const { projectId } = useParams();

  useEffect(() => {
    if (treeStructure) {
      console.log("Tree Structure:", treeStructure);
    } else {
      settreeStructure(projectId); // Fetch tree structure based on project ID
    }
  }, [projectId, settreeStructure, treeStructure]);

  return (
    <div>
      {treeStructure ? (
        <TreeNode filefolderData={treeStructure} />
      ) : (
        <p style={{ color: "white" }}>Loading...</p>
      )}
    </div>
  );
};
