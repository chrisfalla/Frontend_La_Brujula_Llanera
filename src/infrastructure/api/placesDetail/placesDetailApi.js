import httpClient from '../../services/httpClientService';

class PlaceDetailApi {
  async getPlaceDetailById(idPlace) {
    const data = await httpClient.get(`/placeDetail/${idPlace}`);
    return data;
  }
}

export default PlaceDetailApi;
