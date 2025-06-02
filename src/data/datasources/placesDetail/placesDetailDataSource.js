import PlaceDetailApi from '../../api/placeDetail/PlaceDetailApi';

export default class PlaceDetailDatasource {
  async getPlaceDetail(idPlace) {
    try {
      const data = await PlaceDetailApi.getPlaceDetailById(idPlace);
      return data;
    } catch (error) {
      console.error("Error in PlaceDetailDatasource:", error);
      throw error;
    }
  }
}
