import httpClient from '../../services/httpClientService';

// Obtiene reviews por placeId
export const fetchReviewsByPlaceId = async (placeId) => {
  try {
    const response = await httpClient.get(`/ET/review/${placeId}`);
    return response; // Se asume que response ya es response.data
  } catch (error) {
    console.error('❌ [API] Error al obtener reviews:', error);
    throw error;
  }
};