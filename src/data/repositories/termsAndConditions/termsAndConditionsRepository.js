import { fetchTermsAndConditionsUrl } from '../../../infrastructure/api/termsAndConditions/termsAndConditionsApi';

export const termsAndConditionsRepository = {
  getTermsAndConditionsUrl: async () => {
    const url = await fetchTermsAndConditionsUrl();
    return url || 'https://chrisfalla.github.io/Termns-and-Conditions/';
  }
};