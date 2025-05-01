// data/datasources/categories/CategoryMockApi.js

import { Ionicons } from "@expo/vector-icons";

export class CategoryMockApi {
  async fetchCategories() {
    console.log("🔥 Usando MOCK de categorías");

    await new Promise((r) => setTimeout(r, 500));

    return [
      { id: "1", name: "Ecoturismo", icon: "people" },
      { id: "2", name: "Gastronomía", icon: "restaurant" },
      { id: "3", name: "Alojamiento", icon: "home" },
      { id: "4", name: "Mas", icon: "albums" },
      { id: "5", name: "Historia", icon: "book" },
      { id: "6", name: "Deportes", icon: "football" },
      { id: "7", name: "Música", icon: "musical-notes" },
      { id: "8", name: "Arte", icon: "color-palette" },
      { id: "9", name: "Tecnología", icon: "laptop" },
      { id: "10", name: "Salud", icon: "heart" },
    ];
  }
}
