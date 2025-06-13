export default class PlaceDetailRepository {
  constructor(placeDetailDatasource) {
    this.placeDetailDatasource = placeDetailDatasource;
  }

  async getPlaceDetail(idPlace) {
    // Delegamos el trabajo al datasource
    const placeDetail = await this.placeDetailDatasource.getPlaceDetail(idPlace);
    return placeDetail;
  }
}