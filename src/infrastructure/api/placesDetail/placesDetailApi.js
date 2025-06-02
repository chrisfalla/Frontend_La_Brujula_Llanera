import httpClient from '../../services/httpClientService';

const PlaceDetailApi = {
    async getPlaceDetailById(idPlace) {
    try {
        const response = await httpClient.get(`/placeDetail/${idPlace}`);
        return response.data;
    } catch (error) {
        console.error("Error in PlaceDetailApi:", error);
        throw error;
    }
    }
};

export default PlaceDetailApi;
