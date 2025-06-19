import { FavoritesRepository } from '../../../data/repositories/favorites/favoritesRepository';

export const getFavoritesUseCase = async (userId) => {
  return await FavoritesRepository.getFavorites(userId);
};