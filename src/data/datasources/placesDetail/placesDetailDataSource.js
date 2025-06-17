import PlaceDetailModel from '../../../domain/models/placesDetail/placesDetail';

export default class PlaceDetailDatasource {
  constructor(api) {
    this.api = api;
  }

  async getPlaceDetail(idPlace) {
    const apiData = await this.api.getPlaceDetailById(idPlace);

    if (!apiData.idPlace || !apiData.placeName) {
      throw new Error('Datos esenciales faltantes en la respuesta del API');
    }

    return new PlaceDetailModel(apiData);
  }
}