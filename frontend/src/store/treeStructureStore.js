import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getprojecttree } from "../apis/projects";


export const usetreeStore = create((set) =>{
     const queryClient = new QueryClient();
    return {
        treeStructure : null,
        settreeStructure : async (projectId) => {
             const data = await queryClient.fetchQuery({
                queryKey : [`projecttree-${projectId}`],
                queryFn : () => getprojecttree({projectId})
             });
             set({
                treeStructure : data
             })
        }
    }
})
