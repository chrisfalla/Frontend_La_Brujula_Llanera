import httpClientService from "../../services/httpClientService";
import { store } from 'react-redux'; 

const FAVORITES_ENDPOINTS = {
  GET_ALL_FAVORITES: '/favorites',
  GET_USER_FAVORITES: '/favorites/{idUserFk}',  
};

export const getFavorites = async (userId) => {
  try {
    // Si no se proporciona userId como parámetro, intentamos obtenerlo del store
    if (!userId) {
      const state = store.getState();
      userId = state?.auth?.user?.id || state?.auth?.user?.idUser;
      
      console.log('🔄 [API] Obteniendo userId del store:', userId);
      
      if (!userId) {
        console.warn('⚠️ [API] No se encontró userId en el store ni se proporcionó como parámetro');
        return [];
      }
    }

    // Construir el endpoint reemplazando el placeholder
    const endpoint = `/favorites/${userId}`; // Forma directa
    
    console.log('📡 [API] Getting favorites for user:', userId);
    console.log('📡 [API] Request URL:', endpoint);

    const response = await httpClientService.get(endpoint);
    console.log('✅ [API] Get favorites response:', response);
    
    // Asegurarnos de que siempre devolvemos un array
    if (!response) return [];
    return Array.isArray(response) ? response : (Array.isArray(response.places) ? response.places : []);
  } catch (error) {
    console.error("❌ [API] Error fetching favorites:", error);
    return [];
  }
};

// Mantenemos las exportaciones existentes para compatibilidad con el resto del código
export const getDefaultFavorites = async () => {
  // Por defecto, usa ID 44 como fallback
  return getFavorites(44);
};

export const fetchFavorites = getFavorites;
export const fetchDefaultFavorites = getDefaultFavorites;
export const fetchFavoritesUseCase = getFavorites;
export const fetchFavoritesDefaultUseCase = getDefaultFavorites;
