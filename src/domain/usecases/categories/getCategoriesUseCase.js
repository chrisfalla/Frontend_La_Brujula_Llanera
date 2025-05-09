export const getCategoriesUseCase = (repository) => async () => {
  return await repository.getCategories();
};
 