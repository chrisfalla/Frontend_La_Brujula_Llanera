import httpClient from '../infrastructure/services/httpClientService';
import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.android?.config?.googleMaps?.apiKey 
             || Constants.expoConfig?.ios?.config?.googleMapsApiKey;
const GOOGLE_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

function mapPlaceFromBackend(place) {
  return {
    ...place,
    geometry: {
      location: {
        lat: place.latitude || place.lat,
        lng: place.longitude || place.lng,
      }
    },
    // Adaptar los campos para HorizontalCardPlace y el marcador
    name: place.name || place.nombre || place.placeName || place.title,
    category: place.category || place.categoria || place.imageCategoryName || place.categoryInfo?.name || place.types?.[0],
    formatted_address: place.address || place.direccion || place.placeAddress || place.formatted_address || place.description,
    image: place.image || place.imagen || place.imageUrl || (place.photos && place.photos[0]?.url),
    address: place.address || place.direccion || place.placeAddress || place.formatted_address || place.description,
  };
}

function mapPlaceFromGoogle(googlePlace) {
  return {
    // Para el mapa
    geometry: googlePlace.geometry,
    latitude: googlePlace.geometry?.location?.lat,
    longitude: googlePlace.geometry?.location?.lng,
    // Para HorizontalCardPlace
    name: googlePlace.name,
    category: googlePlace.types?.[0] || '',
    address: googlePlace.formatted_address || '',
    image: googlePlace.photos && googlePlace.photos.length > 0
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${googlePlace.photos[0].photo_reference}&key=${API_KEY}`
      : googlePlace.icon || '',
    // Otros campos originales por si acaso
    ...googlePlace,
  };
}

export const searchPlaces = async (query, location, radius = 5000) => {
  if (!query) {
    // Trae todos los lugares del backend
    try {
      const backendResults = await httpClient.get('/places');
      return backendResults.map(mapPlaceFromBackend);
    } catch (error) {
      throw error;
    }
  }

  // Busca primero en el backend usando el endpoint correcto
  let backendResults = [];
  try {
    backendResults = await httpClient.get(`/placeDetail/placesByName/${encodeURIComponent(query)}`);
    if (Array.isArray(backendResults) && backendResults.length > 0) {
      return backendResults.map(mapPlaceFromBackend);
    }
  } catch (error) {
    // Si el error es porque no hay resultados, seguimos con Google
    // Si es otro error grave, puedes loguear o manejarlo aquí
  }

  // Si no hay resultados en el backend, busca en Google Places
  try {
    const response = await axios.get(`${GOOGLE_BASE_URL}/textsearch/json`, {
      params: {
        query,
        location,
        radius,
        key: API_KEY
      }
    });
    return response.data.results.map(mapPlaceFromGoogle);
  } catch (error) {
    console.error('Error al buscar en Google Places:', error.response?.data || error.message);
    throw error;
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(`${GOOGLE_BASE_URL}/details/json`, {
      params: {
        place_id: placeId,
        key: API_KEY
      }
    });

    return response.data.result;
  } catch (error) {
    console.error('Error al obtener detalles del lugar:', error.response?.data || error.message);
    throw error;
  }
};
