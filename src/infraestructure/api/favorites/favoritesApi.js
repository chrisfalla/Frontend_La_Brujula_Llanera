import httpClient from '../../../infraestructure/services/httpClientService';

export const fetchFavorites = async () => {
  const response = await httpClient.get('/favorites');
  return response; // ya es .data desde httpClient
};
