import { addFavorite } from '../../../infrastructure/api/favorites/favoritesApi';

export const addFavoriteUseCase = async (idUserFk, idPlaceFk) => {
  return await addFavorite(idUserFk, idPlaceFk);
};