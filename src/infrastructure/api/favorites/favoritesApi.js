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
    // Si no se proporciona userId como parámetro, intentamos obtenerlo del store
    if (!userId) {
        const state = store.getState();
        userId = state?.auth?.user?.id || state?.auth?.user?.idUser;
        
        if (!userId) {
            return [];
        }
    }

    const endpoint = `/favorites/${userId}`;
    
    try {
        const response = await httpClientService.get(endpoint);
        
        // Manejar diferentes formatos de respuesta
        if (response && response.places) {
            return response.places;
        }
        
        return Array.isArray(response) ? response : [];
    } catch (error) {
        return [];
    }
};

// Agregar favorito
export const addFavorite = async (idUserFk, idPlaceFk) => {
    if (!idUserFk || !idPlaceFk) {
        throw new Error('Se requieren los IDs de usuario y lugar');
    }
    
    const body = { idUserFk, idPlaceFk };
    const response = await httpClientService.post('/favorites', body);
    
    return { status: 200, data: response };
};

// Eliminar favorito - DELETE /favorites/{userId}/{placeId}
export const deleteFavorite = async (idUserFk, idPlaceFk) => {
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
    
    const response = await httpClientService.delete(endpoint);
    
    // Devolver una respuesta consistente
    return { 
        status: 200, 
        data: { 
            userId: userIdClean,
            placeId: placeIdClean,
            message: 'Favorito eliminado correctamente'
        } 
    };
};
