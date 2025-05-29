import { addFavorite } from '../../../infrastructure/api/favorites/favoritesApi';

export const addFavoriteUseCase = async (idUserFk, idPlaceFk) => {
  try {
    console.log(`🔍 [USE-CASE] Añadiendo favorito - User: ${idUserFk}, Place: ${idPlaceFk}`);
    
    // Llamada directa a la API para simplificar y evitar ciclos de dependencia
    const response = await addFavorite(idUserFk, idPlaceFk);
    
    console.log('✅ [USE-CASE] Favorito añadido exitosamente');
    return response;
  } catch (error) {
    console.error('🚨 [USE-CASE] Error añadiendo favorito:', error);
    throw error;
  }
};