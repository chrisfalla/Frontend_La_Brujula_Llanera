import httpClient from '../../services/httpClientService';

export const registerUserApi = async (userData) => {
  const response = await httpClient.post('/user/register', userData);
  return response; // El `httpClient` ya devuelve `response.data`
};
