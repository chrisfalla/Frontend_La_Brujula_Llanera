export class GetPlacesByCategoryUseCase {
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }

    async execute() {
        return await this.placeRepository.getPlaces();
    }
} 