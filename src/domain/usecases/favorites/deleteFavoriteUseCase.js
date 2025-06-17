import { deleteFavorite } from '../../../infrastructure/api/favorites/favoritesApi';

export const deleteFavoriteUseCase = async (idUserFk, idPlaceFk) => {
  const response = await deleteFavorite(idUserFk, idPlaceFk);
  return response;
};