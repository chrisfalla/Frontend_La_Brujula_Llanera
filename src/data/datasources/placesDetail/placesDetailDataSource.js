import PlaceDetailModel from '../../../domain/models/placesDetail/placesDetail';

export default class PlaceDetailDatasource {
  constructor(api) {
    this.api = api;
  }

  async getPlaceDetail(idPlace) {
    try {
      const apiData = await this.api.getPlaceDetailById(idPlace);
      
      console.log("📦 Validando datos del API:", {
        hasId: !!apiData.idPlace,
        hasName: !!apiData.placeName,
        hasCategory: !!apiData.categoryName
      });

      if (!apiData.idPlace || !apiData.placeName) {
        throw new Error('Datos esenciales faltantes en la respuesta del API');
      }

      // Pasa los datos directamente sin transformar
      return new PlaceDetailModel(apiData);
    } catch (error) {
      console.error("❌ Error crítico en Datasource:", {
        error: error.message,
        receivedData: apiData // Solo para debug
      });
      throw new Error(`Error al procesar datos: ${error.message}`);
    }
  }
}