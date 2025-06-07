import { fetchReviewsByPlaceId } from '../../../infrastructure/api/reviews/reviewsApi';

export const reviewsDataSource = {
  getReviewsByPlaceId: async (placeId) => {
    const data = await fetchReviewsByPlaceId(placeId);
    return data;
  }
};