import { useQuery } from "@tanstack/react-query"
import { getprojecttree } from "../../../apis/projects"

export const useprojectree = (projectId) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { isLoading , data : projecttree, isError, error} = useQuery({
        queryFn : () =>   getprojecttree({projectId}),   
      });
    return {
        isLoading,
        projecttree,
        isError,
        error
    }
}