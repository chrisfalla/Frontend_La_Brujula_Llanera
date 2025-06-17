import { addFavorite } from '../../../infrastructure/api/favorites/favoritesApi';

export const addFavoriteUseCase = async (idUserFk, idPlaceFk) => {
  const response = await addFavorite(idUserFk, idPlaceFk);
  return response;
};