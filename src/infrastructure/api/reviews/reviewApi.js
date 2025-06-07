import httpClientService from '../../services/httpClientService';

export const getReviewsByPlaceId = async (placeId) => {
  const response = await httpClientService.get(`/review/${placeId}`);
  return response.data;
};
