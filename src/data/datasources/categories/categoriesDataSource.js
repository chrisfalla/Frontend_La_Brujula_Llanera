import { fetchCategories, fetchMostTappedCategories } from '../../../infrastructure/api/categories/categoriesApi';
import { Category } from '../../../domain/models/categories/category';

// Ojo al typo: dto.isDefault, no "isDefult"
const mapToCategory = dto => new Category({
  id: dto.idCategory,
  name: dto.name,
  icon: dto.icon,
  isDefault: dto.isDefault,
});

export const categoriesDatasource = {
  getCategories: async () => {
    const dtos = await fetchCategories();
    return dtos.map(mapToCategory);
  },
  getMostTappedCategories: async () => {
    const dtos = await fetchMostTappedCategories();
    return dtos.map(mapToCategory);
  }
};
