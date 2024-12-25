
import axiosInstance from '../config/axiosConfig.js';

export const pingApi = async () => {
    try {
        const response = await axiosInstance.get('/api/v1/p');
        console.log(response.data);
        return response.data;
    } catch (error) {
         console.log(error);
         throw error;
    }
}