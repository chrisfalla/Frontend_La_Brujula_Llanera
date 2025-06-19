import { getFavorites } from '../../../infrastructure/api/favorites/favoritesApi';
import { createFavorite } from '../../../domain/models/favorites/favorite';

// Función para sanitizar URLs
const sanitizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  
  return url
    .replace('httpps://', 'https://')
    .replace('https:///', 'https://')
    .replace('storagge', 'storage')
    .replace('objject', 'object')
    .replace('storage/v11/', 'storage/v1/')
    .replace('supabase.cco', 'supabase.co')
    .replace('signn', 'sign')
    .replace('object//', 'object/')
    .replace(/\/+/g, '/') // Eliminar barras repetidas
    .replace(':/', '://'); // Restaurar protocolo con barras dobles
};

const mapToFavorite = dto => {
  if (!dto) return null;
  
  // Extraer URL de imagen de forma segura
  let imageUrl = '';
  
  if (dto.image) {
    if (typeof dto.image === 'string') {
      imageUrl = dto.image;
    } else if (dto.image.url) {
      imageUrl = dto.image.url;
    } else if (dto.image.imageUrl) {
      imageUrl = dto.image.imageUrl;
    }
  } else if (dto.imageUrl) {
    imageUrl = dto.imageUrl;
  }
  
  // Limpiar URL para evitar problemas
  imageUrl = sanitizeImageUrl(imageUrl);
  
  // Usar la función en lugar de la clase para crear un objeto plano
  return createFavorite({
    idPlace: dto.idPlace || dto.id || 0,
    name: dto.name || dto.placeName || '',
    rating: dto.rating || dto.ratingStars || 0,
    imageUrl: imageUrl,
    categoryName: dto.categoryName || dto.category || '',
    userId: dto.userId || dto.idUser || 0,
  });
};

export const favoritesRepository = {
  getFavorites: async (userId) => {
    const response = await getFavorites(userId);
    
    // Verificamos si la respuesta tiene la estructura esperada
    if (response && response.places && Array.isArray(response.places)) {
      const favorites = response.places.map(mapToFavorite).filter(Boolean);
      return favorites;
    } else if (Array.isArray(response)) {
      const favorites = response.map(mapToFavorite).filter(Boolean);
      return favorites;
    }
    
    return [];
  }
};

export const FavoritesRepository = favoritesRepository;