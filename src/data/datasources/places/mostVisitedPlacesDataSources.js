import { fetchMostVisitedPlaces } from '../../../infrastructure/api/places/placesApi';
import { Place } from '../../../domain/models/places/places'; // Esta importación es correcta

export const placesDatasource = {
    getMostVisitedPlaces: async () => {
        const dtos = await fetchMostVisitedPlaces();
        return dtos.map(mapToPlace); // Mapea los datos a instancias del modelo
    },
};

// Función para mapear DTO a modelo
const mapToPlace = dto => new Place({
    idPlace: dto.idPlace,
    placeName: dto.placeName,
    visitCount: dto.visitCount,
    imageUrl: dto.imageUrl,
  });
