import { fetchCategories, fetchMostTappedCategories } from '../../../infraestructure/api/categories/categoriesApi';
import { category } from '../../../domain/models/categories/category';

//mapeo(cast) es convertir un json a una lista de objetos
const mapToCategory = (dto) => new category({
  id: dto.idCategory,
  name: dto.name,
  icon: dto.icon,
  isDefault: dto.isDefult
});

export const categoriesDatasource = {
  getCategories: async () => {
    const dtos = await fetchCategfories();
    //.map, for que recorre la lista
    return dtos.map(mapToCategory);
  },

  getMostTappedCategories: async () => {
    const dtos = await fetchMostTappedCategories();
    return dtos.map(mapToCategory);
  }
};
