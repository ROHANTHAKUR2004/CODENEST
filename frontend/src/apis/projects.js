
import axiosInstance from "../config/axiosConfig";
export const createprojectApi = async () => {
    try {
        const  response = await axiosInstance.post('/api/v1/projects');
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    }


}


export const getprojecttree = async ({projectId}) =>{
    try {
        const res = await axiosInstance.get(`/api/v1/projects/${projectId}/tree`);
        return res?.data?.data;
    } catch (error) {
         console.log(error);
         throw error;
    }
}