import httpClient from '../../services/httpClientService';

export const fetchTermsAndConditionsUrl = async () => {
  try {
    const response = await httpClient.get('/terms-and-conditions');
    console.log('✅ [API] Terms and conditions URL fetched successfully:', response);
    return response.url;
  } catch (error) {
    console.error('❌ [API] Error fetching terms and conditions URL:', error);
    // URL de respaldo en caso de error
    return 'https://chrisfalla.github.io/Termns-and-Conditions/';
  }
};
