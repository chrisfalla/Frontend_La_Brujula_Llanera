// src/domain/usecases/favorites/getFavoritesUseCase.js
import { favoritesRepository, FavoritesRepository } from '../../../data/repositories/favorites/favoritesRepository';

export const getFavoritesUseCase = async (userId) => {
  try {
    console.log('🔍 [USE-CASE] Solicitando favoritos para usuario', userId);
    
    if (!userId) {
      console.warn('⚠️ [USE-CASE] No se proporcionó ID de usuario');
      return [];
    }
    
    // Check which repository is available and use it
    const repository = favoritesRepository || FavoritesRepository;
    
    if (!repository) {
      console.error('🚨 [USE-CASE] El repositorio no está disponible');
      // Create a direct implementation as fallback
      const response = await import('../../../infrastructure/api/favorites/favoritesApi')
        .then(module => module.fetchFavorites(userId))
        .catch(error => {
          console.error('Error with direct API call:', error);
          return [];
        });
      return response;
    }
    
    if (!repository.getFavorites) {
      console.error('🚨 [USE-CASE] El método getFavorites no está disponible en el repositorio');
      return [];
    }
    
    const favorites = await repository.getFavorites(userId);
    console.log('✅ [USE-CASE] Favoritos obtenidos:', favorites.length);
    return favorites;
  } catch (error) {
    console.error('🚨 [USE-CASE] Error obteniendo favoritos:', error);
    // Return empty array to prevent app crashes
    return [];
  }
};

