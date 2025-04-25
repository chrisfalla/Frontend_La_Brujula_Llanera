// data/datasources/categories/CategoryMockApi.js

export class CategoryMockApi {
  async fetchCategories() {
    console.log("🔥 Usando MOCK de categorías");

    await new Promise((r) => setTimeout(r, 500));

    return [
      {
        "idCategory": 1,
        "name": "Ecoturismo",
        "isActive": true,
        "createdAt": "2025-04-17T15:45:15.079Z",
        "updatedAt": "2025-04-17T15:45:15.079Z",
        "isDefault": true
      },
      {
        "idCategory": 2,
        "name": "Cultura",
        "isActive": true,
        "createdAt": "2025-04-17T15:45:15.079Z",
        "updatedAt": "2025-04-17T15:45:15.079Z",
        "isDefault": false
      },
      {
        "idCategory": 5,
        "name": "Alojamiento",
        "isActive": true,
        "createdAt": "2025-04-17T15:45:15.079Z",
        "updatedAt": "2025-04-17T15:45:15.079Z",
        "isDefault": true
      },
      {
        "idCategory": 3,
        "name": "Gastronomía",
        "isActive": true,
        "createdAt": "2025-04-17T15:45:15.079Z",
        "updatedAt": "2025-04-17T15:45:15.079Z",
        "isDefault": true
      },
      {
        "idCategory": 4,
        "name": "Servicios",
        "isActive": true,
        "createdAt": "2025-04-17T15:45:15.079Z",
        "updatedAt": "2025-04-18T19:49:11.760Z",
        "isDefault": false
      },
      {
        "idCategory": 6,
        "name": "Entretenimiento",
        "isActive": true,
        "createdAt": "2025-04-17T15:45:15.079Z",
        "updatedAt": "2025-04-17T15:45:15.079Z",
        "isDefault": false
      }
    ];
  }
}
