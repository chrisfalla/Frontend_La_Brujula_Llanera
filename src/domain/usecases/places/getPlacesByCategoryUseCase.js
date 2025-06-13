import { placesRepository } from "../../../data/repositories/places/placesRepository";

export const getPlacesByCategory = async (idCategory) => {
  const places = await placesRepository.getPlacesByCategory(idCategory);
  
  // Verificar si los datos son válidos
  if (Array.isArray(places) && places.length > 0) {
    return places;
  }
  
  return [];
};