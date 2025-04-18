// domain/usecases/categories/GetCategoriesUseCase.js

export class GetCategoriesUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute() {
    return await this.categoryRepository.getCategories();
  }
}
