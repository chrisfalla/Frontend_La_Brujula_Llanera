import { termsAndConditionsRepository } from '../../../data/repositories/termsAndConditions/termsAndConditionsRepository';

export const getTermsAndConditionsUrlUseCase = async () => {
  const url = await termsAndConditionsRepository.getTermsAndConditionsUrl();
  return url || 'https://chrisfalla.github.io/Termns-and-Conditions/';
};