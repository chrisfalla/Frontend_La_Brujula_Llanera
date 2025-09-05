import httpClient from '../../services/httpClientService';
import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY =
  Constants.manifest?.extra?.GOOGLE_PLACES_API_KEY ||
  Constants.expoConfig?.extra?.GOOGLE_PLACES_API_KEY;

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

export const searchPlacesApi = async (query, location, radius = 5000) => {
  if (!query) return [];

  if (!API_KEY) {
    console.warn('Google Places API key not found');
    return [];
  }

  try {
    let url = `${GOOGLE_BASE_URL}/textsearch/json`;
    let params = {
      query,
      key: API_KEY,
    };

    if (location) {
      params.location = location;
      params.radius = radius;
    }

    const response = await axios.get(url, { params });

    if (response.data && response.data.results) {
      return response.data.results.map(mapPlaceFromGoogle);
    }

    return [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};

export const getPlaceDetailsApi = async (placeId) => {
  if (!placeId || !API_KEY) {
    console.warn('Place ID or API key not found');
    return null;
  }

  try {
    const url = `${GOOGLE_BASE_URL}/details/json`;
    const params = {
      place_id: placeId,
      key: API_KEY,
      fields: 'name,formatted_address,geometry,photos,rating,types,editorial_summary,formatted_phone_number,website,opening_hours,reviews'
    };

    const response = await axios.get(url, { params });

    if (response.data && response.data.result) {
      const place = response.data.result;
      
      // Procesar las fotos si existen
      if (place.photos && place.photos.length > 0) {
        place.photos = place.photos.map(photo => ({
          ...photo,
          url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
        }));
      }
      
      return place;
    }

    return null;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
};
