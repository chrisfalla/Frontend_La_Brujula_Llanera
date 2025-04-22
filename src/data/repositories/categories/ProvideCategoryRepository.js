// data/repositories/provideCategoryRepository.js
import config from "../../../shared/constants/environment/environment";
import { CategoryApi } from "../../../data/datasources/categories/CategoryApi";
import { CategoryMockApi } from "../../../data/datasources/categories/CategoryMockApi";
import { CategoryRepositoryImpl } from "./CategoryRepositoryImpl";

export function provideCategoryRepository() {
  const datasource = config.USE_MOCK_CATEGORIES
    ? new CategoryMockApi()
    : new CategoryApi();

  return new CategoryRepositoryImpl(datasource);
}
