import { placesRepository } from '../../../data/repositories/places/placesRepository';

export const getPlacesByTagsUseCase = async (tagIds) => {
  return await placesRepository.getTopRatedPlacesByTags(tagIds);
};
