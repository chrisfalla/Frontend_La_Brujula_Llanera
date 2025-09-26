import httpClientService from "../../services/httpClientService";

import httpClient from '../../services/httpClientService';

export const dashboardApi = {
    createPlace: async (placeData) => {
        try {
            const response = await httpClient.post('/dashboard/createDashBoard', placeData);
            return response;
        } catch (error) {
            console.error('Error creating place:', error);
            throw error;
        }
    },

    // el resto de metodos iran aqui 
};