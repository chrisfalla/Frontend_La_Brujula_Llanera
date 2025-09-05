import { getPlaceDetailsApi } from "../../../infrastructure/api/places/searchPlacesApi";
import { Place } from "../../../domain/models/places/places";

export const placeDetailsDataSource = {
  getPlaceDetails: async (placeId) => {
    try {
      const response = await getPlaceDetailsApi(placeId);

      if (!response || typeof response !== 'object') {
        return null;
      }

      // Mapear el resultado al modelo Place
      return mapToPlaceDetails(response);
    } catch (error) {
      console.error('Error in placeDetailsDataSource:', error);
      return null;
    }
  }
};

// Función para mapear los detalles de Google Places al modelo Place
const mapToPlaceDetails = (googlePlaceDetails) => {
  return new Place({
    idPlace: googlePlaceDetails.place_id || 'unknown',
    name: googlePlaceDetails.name || 'Sin nombre',
    address: googlePlaceDetails.formatted_address || '',
    latitude: googlePlaceDetails.geometry?.location?.lat || 0,
    longitude: googlePlaceDetails.geometry?.location?.lng || 0,
    image: googlePlaceDetails.photos && googlePlaceDetails.photos.length > 0 
      ? googlePlaceDetails.photos[0].url 
      : googlePlaceDetails.icon || '',
    rating: googlePlaceDetails.rating || 0,
    category: googlePlaceDetails.types?.[0] || 'general',
    description: googlePlaceDetails.editorial_summary?.overview || '',
    // Datos adicionales específicos de detalles
    phone: googlePlaceDetails.formatted_phone_number || '',
    website: googlePlaceDetails.website || '',
    openingHours: googlePlaceDetails.opening_hours || null,
    reviews: googlePlaceDetails.reviews || [],
    // Mantener datos adicionales de Google Places
    geometry: googlePlaceDetails.geometry,
    place_id: googlePlaceDetails.place_id,
    types: googlePlaceDetails.types || []
  });
};
