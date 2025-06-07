import httpClientService from '../../services/httpClientService';

export const getReviewsByPlaceId = async (placeId) => {
  return await httpClientService.get(`/review/${placeId}`);
};

export const addReview = async ({ comment, ratingValue, userId, placeId }) => {
  const response = await httpClientService.post('/review', {
    comment,
    ratingValue,
    userId,
    placeId,
  });
  return response;
};
