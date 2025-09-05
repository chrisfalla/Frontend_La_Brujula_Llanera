import { placesRepository } from "../../../data/repositories/places/placesRepository";

export const searchPlacesUseCase = async (query, location, radius = 5000) => {
  try {
    const places = await placesRepository.searchPlaces(query, location, radius);
    
    // Verificar si los datos son válidos
    if (Array.isArray(places) && places.length > 0) {
      return places;
    }
    
    return [];
  } catch (error) {
    console.error('Error in searchPlacesUseCase:', error);
    return [];
  }
};
