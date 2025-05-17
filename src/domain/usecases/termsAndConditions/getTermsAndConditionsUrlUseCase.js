import { termsAndConditionsRepository } from '../../../data/repositories/termsAndConditions/termsAndConditionsRepository';

export const getTermsAndConditionsUrlUseCase = async () => {
  try {
    console.log('🔍 [USE-CASE] Getting terms and conditions URL');
    const url = await termsAndConditionsRepository.getTermsAndConditionsUrl();
    console.log('✅ [USE-CASE] Terms and conditions URL obtained:', url);
    return url;
  } catch (error) {
    console.error('🚨 [USE-CASE] Error getting terms and conditions URL:', error);
    // URL de respaldo en caso de error
    return 'https://chrisfalla.github.io/Termns-and-Conditions/';
  }
};
