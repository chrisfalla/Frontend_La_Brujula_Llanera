import { placesRepository } from '../../../data/repositories/places/placesRepository';

export const getTopRatedPlacesByCategoryUseCase = async (idCategory) => {
  return await placesRepository.getTopRatedPlacesByCategory(idCategory);
};
