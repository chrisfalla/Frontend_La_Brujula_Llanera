import { placesRepository } from "../../../data/repositories/places/placesRepository";

export const getPlacesByCategory = async (idCategory) => {
  return await placesRepository.getPlacesByCategory(idCategory);
};
