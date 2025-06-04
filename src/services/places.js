import Constants from 'expo-constants';
import axios from 'axios';

const API_KEY = Constants.expoConfig?.android?.config?.googleMaps?.apiKey 
             || Constants.expoConfig?.ios?.config?.googleMapsApiKey;

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export const searchPlaces = async (query, location, radius = 5000) => {
  try {
    const response = await axios.get(`${BASE_URL}/textsearch/json`, {
      params: {
        query,
        location, // e.g. "4.7110,-74.0721"
        radius,
        key: API_KEY
      }
    });

    return response.data.results;
  } catch (error) {
    console.error('Error al buscar lugares:', error.response?.data || error.message);
    throw error;
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/details/json`, {
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
