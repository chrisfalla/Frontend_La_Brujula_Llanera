export default class GetPlaceDetailUseCase {
  constructor(placeDetailRepository) {
    this.placeDetailRepository = placeDetailRepository;
  }

  async execute(idPlace) {
    try {
      // Llama al método del repositorio para obtener los detalles del lugar
      const placeDetail = await this.placeDetailRepository.getPlaceDetail(idPlace);
      return placeDetail;
    } catch (error) {
      console.error("Error in GetPlaceDetailUseCase:", error);
      throw error;
    }
  }
}
