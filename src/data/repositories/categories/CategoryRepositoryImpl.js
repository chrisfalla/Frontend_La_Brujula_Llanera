// data/repositories/categories/CategoryRepositoryImpl.js

export class CategoryRepositoryImpl {
  constructor(datasource) {
    this.datasource = datasource;
  }

  async getCategories() {
    return await this.datasource.fetchCategories();
  }
}
