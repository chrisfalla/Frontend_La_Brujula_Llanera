import httpClient from '../../services/httpClientService';

export const fetchTermsAndConditionsUrl = async () => {
  try {
    const response = await httpClient.get('/terms-and-conditions');
    return response.url;
  } catch (error) {
    // URL de respaldo en caso de error
    return 'https://chrisfalla.github.io/Termns-and-Conditions/';
  }
};
