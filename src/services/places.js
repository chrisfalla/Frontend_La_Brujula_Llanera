import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY =
  Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY ||
  Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;

console.log('[places.js] GOOGLE_PLACES_API_KEY:', API_KEY);

const GOOGLE_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

function mapPlaceFromGoogle(googlePlace) {
  return {
    geometry: googlePlace.geometry,
    latitude: googlePlace.geometry?.location?.lat,
    longitude: googlePlace.geometry?.location?.lng,
    name: googlePlace.name,
    category: googlePlace.types?.[0] || '',
    address: googlePlace.formatted_address || '',
    image:
      googlePlace.photos && googlePlace.photos.length > 0
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${googlePlace.photos[0].photo_reference}&key=${API_KEY}`
        : googlePlace.icon || '',
    ...googlePlace,
  };
}

export const searchPlaces = async (query, location, radius = 5000) => {
  console.log('[searchPlaces] query:', query, 'location:', location, 'API_KEY:', API_KEY);
  if (!query) return [];

  if (!API_KEY) {
    console.warn('Google Places API Key no encontrada.');
    return [];
  }

  try {
    const response = await axios.get(`${GOOGLE_BASE_URL}/textsearch/json`, {
      params: {
        query,
        location,
        radius,
        key: API_KEY,
      },
    });

    console.log('[searchPlaces] response.data:', JSON.stringify(response.data));

    return response.data.results.map(mapPlaceFromGoogle);
  } catch (error) {
    console.error('Error al buscar en Google Places:', error.response?.data || error.message);
    throw error;
  }
};

export const getPlaceDetails = async (placeId) => {
  if (!API_KEY) {
    console.warn('Google Places API Key no encontrada.');
    return null;
  }

  try {
    const response = await axios.get(`${GOOGLE_BASE_URL}/details/json`, {
      params: {
        place_id: placeId,
        key: API_KEY,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error('Error al obtener detalles del lugar:', error.response?.data || error.message);
    throw error;
  }
};
