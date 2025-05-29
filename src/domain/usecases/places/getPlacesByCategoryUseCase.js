import { placesRepository } from "../../../data/repositories/places/placesRepository";

export const getPlacesByCategory = async (idCategory) => {
  try {
    console.log('🔍 [USE-CASE] Obteniendo lugares para categoría ID:', idCategory);
    const places = await placesRepository.getPlacesByCategory(idCategory);
    console.log('✅ [USE-CASE] Lugares obtenidos:', places?.length || 0);
    
    // Verificar si los datos son válidos
    if (Array.isArray(places) && places.length > 0) {
      // Mapear y normalizar datos (opcional, ya lo hace el datasource)
      return places;
    }
    
    return [];
  } catch (error) {
    console.error('❌ [USE-CASE] Error en getPlacesByCategory:', error);
    return [];
  }
};
