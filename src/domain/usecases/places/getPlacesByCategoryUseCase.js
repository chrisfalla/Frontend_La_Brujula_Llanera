import { placesRepository } from "../../../data/repositories/places/placesRepository";

export const getPlacesByCategory = async (idCategory) => {
  try {
    console.log('🔍 [USE-CASE] Obteniendo lugares para categoría ID:', idCategory);
    const places = await placesRepository.getPlacesByCategory(idCategory);
    console.log('✅ [USE-CASE] Lugares obtenidos:', places?.length || 0);
    
    // Verificar si los datos son válidos y completos
    if (Array.isArray(places)) {
      const hasValidData = places.some(place => place.placeName && place.placeName !== 'Lugar sin nombre');
      
      if (!hasValidData) {
        console.warn('⚠️ [USE-CASE] Los lugares obtenidos no tienen datos válidos');
        
        // Si todos los lugares tienen datos incompletos, intentamos añadir información básica
        if (places.length > 0) {
          // Crear nombres genéricos para que al menos se vea algo
          return places.map((place, index) => ({
            ...place,
            placeName: place.placeName || `Lugar ${index + 1}`,
            imageUrl: place.imageUrl || 'https://via.placeholder.com/150',
            idPlace: place.idPlace || `place-${index}`
          }));
        }
      }
    }
    
    return places || [];
  } catch (error) {
    console.error('❌ [USE-CASE] Error en getPlacesByCategory:', error);
    return [];
  }
};
