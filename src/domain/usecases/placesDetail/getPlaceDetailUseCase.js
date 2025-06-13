// src/domain/usecases/placesDetail/getPlaceDetailUseCase.js
export default class GetPlaceDetailUseCase {
  constructor(placeDetailRepository) {
    this.placeDetailRepository = placeDetailRepository;
  }

  async execute(idPlace) {
    const placeDetail = await this.placeDetailRepository.getPlaceDetail(idPlace);
    return placeDetail;
  }
}
