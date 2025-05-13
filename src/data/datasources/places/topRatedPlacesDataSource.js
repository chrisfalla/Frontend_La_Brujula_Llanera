import { fetchTopRatedPlacesByCategory } from '../../../infrastructure/api/places/placesApi';
import { Place } from '../../../domain/models/places/places';

const mapToPlace = dto => new Place({
    idPlace: dto.idPlace,
    placeName: dto.placeName,
    imageUrl: dto.imageUrl,
    ratingStars: dto.ratingStars,
    imageCategoryName: dto.imageCategoryName,
});

export const topRatedPlacesDatasource = {
    getTopRatedPlacesByCategory: async (idCategory) => {
        const dtos = await fetchTopRatedPlacesByCategory(idCategory);
        return dtos.map(mapToPlace);
    }
};
