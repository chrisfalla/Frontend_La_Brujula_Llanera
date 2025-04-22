// infrastructure/services/CategoryServiceFactory.js
import config from "../../../shared/constants/environment/environment"; // Importa la configuración

import { CategoryApi } from "../../../data/datasources/categories/CategoryApi";
import { CategoryMockApi } from "../../../data/datasources/categories/CategoryMockApi";
import { CategoryRepositoryImpl } from "../../../data/repositories/categories/CategoryRepositoryImpl";

export function provideCategoryRepository() {
  const datasource = config.USE_MOCK_CATEGORIES
    ? new CategoryMockApi()
    : new CategoryApi();

  return new CategoryRepositoryImpl(datasource);
}
