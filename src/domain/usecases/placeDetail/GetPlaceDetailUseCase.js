export class GetPlaceDetailUseCase {
    constructor(placeDetailRepository) {
        this.placeDetailRepository = placeDetailRepository;
    }

    async execute(placeId) {
        return await this.placeDetailRepository.getPlaceDetail(placeId);
    }
} 