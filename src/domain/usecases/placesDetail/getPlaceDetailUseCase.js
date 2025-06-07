// src/domain/usecases/placesDetail/getPlaceDetailUseCase.js


export default class GetPlaceDetailUseCase {
  constructor(placeDetailRepository) {
    this.placeDetailRepository = placeDetailRepository;
  }

  async execute(idPlace) {
    try {
      const placeDetail = await this.placeDetailRepository.getPlaceDetail(idPlace);
      return placeDetail;
    } catch (error) {
      console.error("Error in GetPlaceDetailUseCase:", error);
      throw error;
    }
  }
}
