import { fetchPlacesByCategory } from "../../../infrastructure/api/places/placesApi";
import { Place } from "../../../domain/models/places/places";

export const placesCategoryDataSource = {
  getPlacesByCategory: async (idCategory) => {
    try {
      console.log(`🔍 [DATASOURCE] Solicitando lugares para categoría: ${idCategory}`);
      const response = await fetchPlacesByCategory(idCategory);
      
      if (!response || !Array.isArray(response) || response.length === 0) {
        console.warn(`⚠️ [DATASOURCE] No se encontraron lugares para la categoría ${idCategory}`);
        return [];
      }
      
      console.log(`✅ [DATASOURCE] Se encontraron ${response.length} lugares`);
      
      // Mapear los lugares recibidos al modelo Place
      return response.map((item, index) => mapToPlace(item, index, idCategory));
    } catch (error) {
      console.error(`❌ [DATASOURCE] Error al obtener lugares:`, error);
      return [];
    }
  }
};

// Función mejorada para mapear cualquier formato de datos
const mapToPlace = (item, index, categoryId) => {
  // Determinar si estamos trabajando con datos anidados
  const isNestedStructure = item && item.place && typeof item.place === 'object';
  
  // Extraer los datos correctamente según la estructura
  const placeData = isNestedStructure ? item.place : item;
  const categoryData = isNestedStructure ? item.categoryInfo : item.categoryInfo;
  
  // Extraer nombre del lugar - USAR EL VALOR REAL
  const placeName = placeData.namePlace || placeData.placeName || placeData.name || `Lugar ${index + 1}`;
  
  // Extraer dirección - USAR EL VALOR REAL
  const placeAddress = placeData.addressPlace || placeData.placeAddress || placeData.address || `Dirección de ejemplo #${index + 1}`;
  
  // Crear y devolver un objeto Place con los datos reales
  return new Place({
    idPlace: placeData.idPlace || placeData.id || `place-${categoryId}-${index}`,
    placeName: placeName,  // Usar el nombre real
    visitCount: placeData.visitCount || 0,
    imageUrl: placeData.imageUrl || "https://via.placeholder.com/150",
    ratingStars: placeData.ratingStars || 0,
    imageCategoryName: placeData.imageCategoryName || "Logo",
    tagInfo: placeData.tagInfo || [],
    placeAddress: placeAddress,  // Usar la dirección real
    categoryInfo: categoryData || { idCategory: parseInt(categoryId), category: "Categoría" }
  });
};
