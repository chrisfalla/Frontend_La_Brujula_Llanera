// src/domain/repositories/PlaceDetailRepository.js

export default class PlaceDetailRepository {
  constructor(placeDetailDatasource) {
    this.placeDetailDatasource = placeDetailDatasource;
  }

  async getPlaceDetailById(idPlace) {
    try {
      // Delegamos el trabajo al datasource
      const placeDetail = await this.placeDetailDatasource.getPlaceDetail(idPlace);
      return placeDetail;
    } catch (error) {
      console.error("Error in PlaceDetailRepository:", error);
      throw error;
    }
  }
}
