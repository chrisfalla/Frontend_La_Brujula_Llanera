import { fetchFavorites } from '../../../infrastructure/api/favorites/favoritesApi';
import { Favorite } from '../../../domain/models/favorites/favorite';

const mapToFavorite = dto => {
  if (!dto) return null;
  
  try {
    // Extraemos la URL de la imagen correctamente desde la estructura anidada
    const imageUrl = dto.image?.url || // Si existe image.url
                   dto.image?.imageUrl || // O si existe image.imageUrl
                   dto.imageUrl || // O directamente imageUrl
                   ''; // Como último recurso, string vacío
                   
    console.log(`🖼️ Mapeando imagen para ${dto.name}:`, dto.image);
    
    return new Favorite({
      idPlace: dto.idPlace || dto.id || 0,
      name: dto.name || dto.placeName || '',
      rating: dto.rating || dto.ratingStars || 0,
      imageUrl: imageUrl,
      categoryName: dto.categoryName || dto.category || '',
      userId: dto.userId || dto.idUser || 0
    });
  } catch (error) {
    console.error('Error mapping favorite:', error);
    return null;
  }
};

// Export with lowercase name to match import in use case
export const favoritesRepository = {
  getFavorites: async (userId) => {
    try {
      console.log('📊 [REPOSITORY] Getting favorites for user:', userId);
      const response = await fetchFavorites(userId);
      
      // Verificamos si la respuesta tiene la estructura esperada
      if (response && response.places && Array.isArray(response.places)) {
        console.log('📊 [REPOSITORY] Response has places array structure');
        const favorites = response.places.map(mapToFavorite).filter(Boolean);
        console.log('✅ [REPOSITORY] Mapped favorites:', favorites.length);
        return favorites;
      } else if (Array.isArray(response)) {
        console.log('📊 [REPOSITORY] Response is a direct array');
        const favorites = response.map(mapToFavorite).filter(Boolean);
        console.log('✅ [REPOSITORY] Mapped favorites:', favorites.length);
        return favorites;
      }
      
      console.warn('⚠️ [REPOSITORY] Unexpected response format');
      return [];
    } catch (error) {
      console.error('🚨 [REPOSITORY] Error getting favorites:', error);
      return [];
    }
  }
};

// Also export with capital letter for backward compatibility
export const FavoritesRepository = favoritesRepository;