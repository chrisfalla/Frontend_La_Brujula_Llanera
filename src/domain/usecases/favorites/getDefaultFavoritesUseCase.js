import { getDefaultFavorites } from '../../../infrastructure/api/favorites/favoritesApi';
import { Favorite } from '../../../domain/models/favorites/favorite';

export const getDefaultFavoritesUseCase = async () => {
  try {
    console.log('🔍 [USE-CASE] Solicitando favoritos por defecto');
    
    // Call API directly for simplicity
    const favoritesData = await getDefaultFavorites();
    
    // Process response - it may be wrapped in an object
    const favoritesArray = Array.isArray(favoritesData) ? 
      favoritesData : 
      (favoritesData?.places || []);
    
    // Map to domain objects
    const favorites = favoritesArray.map(item => new Favorite({
      idPlace: item.idPlace || item.id,
      name: item.name || item.placeName,
      rating: item.rating || item.ratingStars || 0,
      imageUrl: (item.image?.url) || item.imageUrl || item.imageUri,
      categoryName: item.categoryName || (item.image?.categoryName) || '',
      userId: item.userId || item.idUser
    })).filter(Boolean);
    
    console.log('✅ [USE-CASE] Favoritos por defecto obtenidos:', favorites.length);
    return favorites;
  } catch (error) {
    console.error('🚨 [USE-CASE] Error obteniendo favoritos por defecto:', error);
    return [];
  }
};
