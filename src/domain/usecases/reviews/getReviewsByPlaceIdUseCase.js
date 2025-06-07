export default class GetReviewsByPlaceIdUseCase {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }

  async execute(placeId) {
    return await this.reviewsRepository.getReviewsByPlaceId(placeId);
  }
}