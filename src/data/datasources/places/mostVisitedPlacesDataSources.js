import { fetchMostVisitedPlaces } from '../../../infraestructure/api/placesApi';
import { Place } from '../../../domain/models/places/place'; // Asegúrate de tener un modelo de lugar

export const placesDatasource = {
    getMostVisitedPlaces: async () => {
        const dtos = await fetchMostVisitedPlaces();
        return dtos.map(mapToPlace); // Mapea los datos a instancias del modelo
    },
};

// Función para mapear DTO a modelo
const mapToPlace = (dto) => new Place({
    idPlace: dto.idPlace,
    placeName: dto.placeName,
    visitCount: dto.visitCount,
    imageUrl: dto.imageUrl,
});
