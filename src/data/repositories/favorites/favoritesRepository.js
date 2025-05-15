import { fetchFavorites } from '../../../infrastructure/api/favorites/favoritesApi';
import { Favorite } from '../../../domain/models/favorites/favorite';

const mapToFavorite = dto => {
  if (!dto) return null;
  
  try {
    return new Favorite({
      idPlace: dto.idPlace || dto.id || 0,
      name: dto.name || dto.placeName || '',
      rating: dto.rating || dto.ratingStars || 0,
      imageUrl: dto.imageUrl || dto.imageUri || '',
      categoryName: dto.categoryName || '',
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
      
      if (!Array.isArray(response)) {
        console.warn('⚠️ [REPOSITORY] Favorites data is not an array');
        return [];
      }
      
      const favorites = response.map(mapToFavorite).filter(Boolean);
      console.log('✅ [REPOSITORY] Mapped favorites:', favorites.length);
      return favorites;
    } catch (error) {
      console.error('🚨 [REPOSITORY] Error getting favorites:', error);
      return [];
    }
  }
};

// Also export with capital letter for backward compatibility
export const FavoritesRepository = favoritesRepository;