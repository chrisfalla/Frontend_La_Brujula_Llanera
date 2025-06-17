import { favoritesRepository, FavoritesRepository } from '../../../data/repositories/favorites/favoritesRepository';

export const getFavoritesUseCase = async (userId) => {
  if (!userId) {
    return [];
  }

  // Check which repository is available and use it
  const repository = favoritesRepository || FavoritesRepository;

  if (!repository) {
    const response = await import('../../../infrastructure/api/favorites/favoritesApi')
      .then(module => module.fetchFavorites(userId))
      .catch(() => []);
    return response;
  }

  if (!repository.getFavorites) {
    return [];
  }

  const favorites = await repository.getFavorites(userId);
  return favorites;
};