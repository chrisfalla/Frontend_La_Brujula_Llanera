export class GetPlacesMoreVisitedUseCase {
    constructor(placeRepository) {
        this.placeRepository = placeRepository;
    }

    async execute() {
        return await this.placeRepository.getPlaces();
    }
} 