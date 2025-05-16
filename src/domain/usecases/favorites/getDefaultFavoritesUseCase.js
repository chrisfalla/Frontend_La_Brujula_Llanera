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
    
    console.log('Raw favorites data:', favoritesArray);
    
    // Map to domain objects with more robust property access
    const favorites = favoritesArray.map(item => {
      if (!item) return null;
      
      // Debug the item structure
      console.log('Processing item:', JSON.stringify(item).substring(0, 100) + '...');
      
      return new Favorite({
        idPlace: item.idPlace || item.id || Math.random().toString(),
        name: item.name || item.placeName || 'Lugar sin nombre',
        rating: parseFloat(item.rating || item.ratingStars || 0),
        imageUrl: (item.image?.url) || item.imageUrl || item.imageUri || 'https://via.placeholder.com/150',
        categoryName: item.categoryName || (item.image?.categoryName) || item.categoryInfo?.name || 'Categoría',
        userId: item.userId || item.idUser || '1'
      });
    }).filter(Boolean); // Remove any null values
    
    console.log('✅ [USE-CASE] Favoritos por defecto obtenidos:', favorites.length);
    return favorites;
  } catch (error) {
    console.error('🚨 [USE-CASE] Error obteniendo favoritos por defecto:', error);
    return [];
  }
};
