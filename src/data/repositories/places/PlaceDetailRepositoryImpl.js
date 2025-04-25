export class PlaceDetailRepositoryImpl {
  constructor(datasource) {
    this.datasource = datasource;
  }

  async getPlaceDetail(placeId) {
    return await this.datasource.fetchPlaceDetail(placeId);
  }
} 