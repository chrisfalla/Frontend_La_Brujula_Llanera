// data/datasources/categories/CategoryMockApi.js

export class CategoryMockApi {
  async fetchCategories() {
    console.log("🔥 Usando MOCK de categorías");

    await new Promise((r) => setTimeout(r, 500));

    return [
      { id: "1", name: "Cultura" },
      { id: "2", name: "Naturaleza" },
      { id: "3", name: "Gastronomía" },
    ];
  }
}
