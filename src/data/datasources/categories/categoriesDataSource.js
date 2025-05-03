import { fetchCategories, fetchMostTappedCategories } from '../../../infraestructure/api/categories/categoriesApi';
import { category } from '../../../domain/models/categories/category';

const mapToCategory = (dto) => new category({
  id: dto.idCategory,
  name: dto.name,
  icon: dto.icon,
  isDefault: dto.isDefult
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
