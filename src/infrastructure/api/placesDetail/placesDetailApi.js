import httpClient from '../../services/httpClientService';

class PlaceDetailApi {
  async getPlaceDetailById(idPlace) {
    try {
      const data = await httpClient.get(`/placeDetail/${idPlace}`);
      console.log("✅ Received data from API:", data); // para verificar la estructura
      return data;
    } catch (error) {
      console.error("❌ Error in PlaceDetailApi:", error);
      throw error;
    }
  }
}

export default PlaceDetailApi;
