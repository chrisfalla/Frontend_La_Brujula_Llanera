import { categoriesDatasource } from '../../../data/datasources/categories/categoriesDataSource';

export const categoriesRepository = {
  getCategories: async () => await categoriesDatasource.getCategories(),
  getMostTappedCategories: async () => await categoriesDatasource.getMostTappedCategories()
};
