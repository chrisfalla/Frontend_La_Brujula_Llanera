import { placesRepository } from "../../../data/repositories/places/placesRepository";

export const getPlaceDetailsUseCase = async (placeId) => {
  try {
    const placeDetails = await placesRepository.getPlaceDetails(placeId);
    
    // Verificar si los datos son válidos
    if (placeDetails && typeof placeDetails === 'object') {
      return placeDetails;
    }
    
    return null;
  } catch (error) {
    console.error('Error in getPlaceDetailsUseCase:', error);
    return null;
  }
};
