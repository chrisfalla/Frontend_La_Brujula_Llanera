import { searchPlacesApi, getPlaceDetailsApi } from "../../../infrastructure/api/places/searchPlacesApi";
import { Place } from "../../../domain/models/places/places";

export const searchPlacesDataSource = {
  searchPlaces: async (query, location, radius = 5000) => {
    try {
      const response = await searchPlacesApi(query, location, radius);

      if (!response || !Array.isArray(response) || response.length === 0) {
        return [];
      }

      // Mapear los resultados al modelo Place
      return response.map((item, index) => mapToPlace(item, index));
    } catch (error) {
      console.error('Error in searchPlacesDataSource:', error);
      return [];
    }
  }
};

// Función para mapear los datos de Google Places al modelo Place
const mapToPlace = (googlePlace, index) => {
  // Extraer coordenadas de manera segura
  const lat = googlePlace.geometry?.location?.lat || 
               googlePlace.geometry?.location?.latitude || 
               googlePlace.latitude || 
               5.335; // Ubicación por defecto (Yopal, Casanare)
  
  const lng = googlePlace.geometry?.location?.lng || 
               googlePlace.geometry?.location?.longitude || 
               googlePlace.longitude || 
               -72.396; // Ubicación por defecto (Yopal, Casanare)
  
  // Validar que las coordenadas sean números válidos
  const latitude = (typeof lat === 'number' && !isNaN(lat)) ? lat : 5.335;
  const longitude = (typeof lng === 'number' && !isNaN(lng)) ? lng : -72.396;
  
  return new Place({
    idPlace: googlePlace.place_id || `search_${index}`,
    name: googlePlace.name || 'Sin nombre',
    address: googlePlace.formatted_address || googlePlace.vicinity || '',
    latitude: latitude,
    longitude: longitude,
    image: googlePlace.photos && googlePlace.photos.length > 0 
      ? googlePlace.photos[0].url 
      : googlePlace.icon || '',
    rating: googlePlace.rating || 0,
    category: googlePlace.types?.[0] || 'general',
    description: googlePlace.editorial_summary?.overview || '',
    // Mantener datos adicionales de Google Places
    geometry: googlePlace.geometry,
    place_id: googlePlace.place_id,
    types: googlePlace.types || []
  });
};
