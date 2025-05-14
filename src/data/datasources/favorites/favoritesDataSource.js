import { fetchFavorites } from '../../../infraestructure/api/favorites/favoritesApi';
import { favorite } from '../../../domain/models/favorites/favorites';

const mapToFavorite = (dto) => {
  console.log('Mapeando DTO a Favorito:', dto);
  return new favorite({
    id: dto.id,
    categoryId: dto.categoryId,
    userId: dto.userId
  });
};

export const favoritesDatasource = {
  getFavorites: async () => {
    console.log('Ejecutando datasource.getFavorites');
    try {
      const dtos = await fetchFavorites();
      console.log('Datos obtenidos de API:', dtos);
      
      if (!dtos || !Array.isArray(dtos)) {
        console.error('Error: dtos no es un array:', dtos);
        return [];
      }
      
      const favorites = dtos.map(mapToFavorite);
      console.log('Favoritos mapeados:', favorites);
      return favorites;
    } catch (error) {
      console.error('Error en datasource.getFavorites:', error);
      throw error;
    }
  }
};