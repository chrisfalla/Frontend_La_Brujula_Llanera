import { reviewsDataSource } from '../../datasources/reviews/reviewsDataSource';

export const reviewsRepository = {
  getReviewsByPlaceId: async (placeId) => {
    return await reviewsDataSource.getReviewsByPlaceId(placeId);
  }
};