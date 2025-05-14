import { favoritesDatasource } from '../../datasources/favorites/favoritesDataSource';

export const favoritesRepository = {
  getFavorites: async () => await favoritesDatasource.getFavorites(),
};

