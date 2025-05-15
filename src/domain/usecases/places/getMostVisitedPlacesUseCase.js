import { placesRepository } from '../../../data/repositories/places/placesRepository';

export const getMostVisitedPlacesUseCase = async () => {
  return await placesRepository.getMostVisitedPlaces();
};
