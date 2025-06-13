import { fetchMostVisitedPlaces } from '../../../infrastructure/api/places/placesApi';
import { Place } from '../../../domain/models/places/places'; // Esta importación es correcta

export const placesDatasource = {
  getMostVisitedPlaces: async () => {
    const dtos = await fetchMostVisitedPlaces();
    return dtos.map(mapToPlace); // Mapea los datos a instancias del modelo
  },
};

// Función para mapear DTO a modelo
const mapToPlace = dto => {
  // Asegúrate de que la URL no tenga un esquema incorrecto (como 'httpss://') 
  const fixedImageUrl = dto.imageUrl?.replace('httpss://', 'https://');
  return new Place({
    idPlace: dto.idPlace,
    placeName: dto.placeName,
    visitCount: dto.visitCount,
    imageUrl: fixedImageUrl || dto.imageUrl,
  });
};
