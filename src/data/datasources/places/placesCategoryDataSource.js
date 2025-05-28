import { fetchPlacesByCategory } from "../../../infrastructure/api/places/placesApi";
import { Place } from "../../../domain/models/places/places";

export const placesCategoryDataSource = {
  getPlacesByCategory: async (idCategory) => {
    const dtos = await fetchPlacesByCategory(idCategory);
    return dtos.map(mapToPlace);
  }
};

// Función para mapear DTO a modelo
const mapToPlace = dto => {
  // Asegúrate de que la URL no tenga un esquema incorrecto
  const fixedImageUrl = dto.imageUrl?.replace('httpss://', 'https://');
  
  return new Place({
    idPlace: dto.idPlace,
    placeName: dto.placeName,
    visitCount: dto.visitCount || 0,
    imageUrl: fixedImageUrl || dto.imageUrl,
    ratingStars: dto.ratingStars || 0,
    imageCategoryName: dto.imageCategoryName || "",
    tagInfo: dto.tagInfo || [],
    placeAddress: dto.placeAddress || "Dirección no disponible",
    categoryInfo: dto.categoryInfo || {}
  });
};