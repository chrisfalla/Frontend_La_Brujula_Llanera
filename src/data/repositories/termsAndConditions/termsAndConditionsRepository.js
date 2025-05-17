import { fetchTermsAndConditionsUrl } from '../../../infrastructure/api/termsAndConditions/termsAndConditionsApi';

export const termsAndConditionsRepository = {
  getTermsAndConditionsUrl: async () => {
    try {
      const url = await fetchTermsAndConditionsUrl();
      return url;
    } catch (error) {
      console.error('🚨 [REPOSITORY] Error getting terms and conditions URL:', error);
      // URL de respaldo en caso de error
      return 'https://chrisfalla.github.io/Termns-and-Conditions/';
    }
  }
};
