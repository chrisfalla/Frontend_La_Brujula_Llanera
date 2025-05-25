import httpClientService from "../../services/httpClientService";
import { store } from 'react-redux'; 

// Endpoints para favoritos
const FAVORITES_ENDPOINTS = {
  GET_USER_FAVORITES: '/favorites/{userId}',
  ADD_FAVORITE: '/favorites',
  DELETE_FAVORITE: '/favorites/{userId}/{placeId}'
};

// Obtener favoritos de un usuario
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

    const endpoint = `/favorites/${userId}`;
    console.log('📡 [API] Obteniendo favoritos para usuario:', userId);
    console.log('📡 [API] Request URL:', endpoint);

    const response = await httpClientService.get(endpoint);
    console.log('✅ [API] Respuesta favoritos:', response);
    
    // Manejar diferentes formatos de respuesta
    if (response && response.places) {
      return response.places;
    }
    
    return Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("❌ [API] Error obteniendo favoritos:", error);
    return [];
  }
};

// Agregar favorito
export const addFavorite = async (idUserFk, idPlaceFk) => {
  try {
    if (!idUserFk || !idPlaceFk) {
      throw new Error('Se requieren los IDs de usuario y lugar');
    }
    
    console.log(`📡 [API] Añadiendo favorito - Usuario: ${idUserFk}, Lugar: ${idPlaceFk}`);
    
    const body = { idUserFk, idPlaceFk };
    const response = await httpClientService.post('/favorites', body);
    
    console.log('✅ [API] Favorito añadido:', response);
    return { status: 200, data: response };
  } catch (error) {
    console.error('❌ [API] Error añadiendo favorito:', error);
    throw error;
  }
};

// Eliminar favorito - DELETE /favorites/{userId}/{placeId}
export const deleteFavorite = async (idUserFk, idPlaceFk) => {
  try {
    console.log(`📡 [API] Deleting favorite - User: ${idUserFk}, Place: ${idPlaceFk}`);
    
    if (!idUserFk || !idPlaceFk) {
      throw new Error('Se requieren los IDs de usuario y lugar');
    }
    
    // Asegurar que los IDs son strings o números válidos
    const userIdClean = String(idUserFk).trim();
    const placeIdClean = String(idPlaceFk).trim();
    
    if (!userIdClean || !placeIdClean) {
      throw new Error('IDs de usuario o lugar inválidos');
    }
    
    // Endpoint para eliminar favorito
    const endpoint = `/favorites/${userIdClean}/${placeIdClean}`;
    
    console.log('📡 [API] Delete favorite URL:', endpoint);
    const response = await httpClientService.delete(endpoint);
    console.log('✅ [API] Delete favorite response:', response);
    
    // Devolver una respuesta consistente
    return { 
      status: 200, 
      data: { 
        userId: userIdClean,
        placeId: placeIdClean,
        message: 'Favorito eliminado correctamente'
      } 
    };
  } catch (error) {
    console.error('❌ [API] Error deleting favorite:', error);
    throw error;
  }
};

// Exportaciones para compatibilidad
export const fetchFavorites = getFavorites;
export const getDefaultFavorites = () => getFavorites(44);
