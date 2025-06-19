import { deleteFavorite } from '../../../infrastructure/api/favorites/favoritesApi';

export const deleteFavoriteUseCase = async (idUserFk, idPlaceFk) => {
  return await deleteFavorite(idUserFk, idPlaceFk);
};