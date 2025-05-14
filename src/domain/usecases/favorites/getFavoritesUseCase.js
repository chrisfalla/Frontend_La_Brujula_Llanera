export const getFavoritesUseCase = (repository) => async () => {
  return await repository.getFavorites();
};