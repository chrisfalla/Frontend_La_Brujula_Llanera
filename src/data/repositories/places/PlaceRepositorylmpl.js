export class PlaceRepositoryImpl {
    constructor(datasource) {
      this.datasource = datasource;
    }
  
    async getPlaces() {
      return await this.datasource.fetchPlaces();
    }
  }