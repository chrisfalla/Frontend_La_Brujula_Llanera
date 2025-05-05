export const getMostTappedCategoriesUseCase = (repository) => async () => {
    return await repository.getMostTappedCategories();
  };
  