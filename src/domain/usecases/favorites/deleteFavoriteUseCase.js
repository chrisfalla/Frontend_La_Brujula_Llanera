import { deleteFavorite } from '../../../infrastructure/api/favorites/favoritesApi';

export const deleteFavoriteUseCase = async (idUserFk, idPlaceFk) => {
  try {
    console.log(`🔍 [USE-CASE] Eliminando favorito - User: ${idUserFk}, Place: ${idPlaceFk}`);
    
    // Llamada directa a la API para simplificar y evitar ciclos de dependencia
    const response = await deleteFavorite(idUserFk, idPlaceFk);
    
    console.log('✅ [USE-CASE] Favorito eliminado exitosamente');
    return response;
  } catch (error) {
    console.error('🚨 [USE-CASE] Error eliminando favorito:', error);
    throw error;
  }
};