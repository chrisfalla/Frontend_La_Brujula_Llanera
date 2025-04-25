export class GetPlacesByTagsUseCase {
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }

    async execute() {
        return await this.placeRepository.getPlaces();
    }
} 