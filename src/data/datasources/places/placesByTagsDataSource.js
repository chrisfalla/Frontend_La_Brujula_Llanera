import { fetchTopRatedPlacesByTags } from '../../../infrastructure/api/places/placesApi';
import { Place } from '../../../domain/models/places/places';

const mapToPlace = dto => {
    const placeData = dto.place || dto;
    return new Place({
        idPlace: placeData.idPlace,
        placeName: placeData.placeName,
        visitCount: placeData.visitCount || null,
        imageUrl: placeData.imageUrl,
        ratingStars: placeData.ratingStars,
        imageCategoryName: placeData.imageCategoryName,
        tagInfo: dto.tagInfo || null,
        placeAddress: placeData.placeAddress || '',  // Corregido spelling y clave
        categoryInfo: dto.categoryInfo || null        // Mapeo de categoryInfo
    });
};

export const placesByTagsDataSource = {
    getTopRatedPlacesByTags: async (tagIds) => {
        const dtos = await fetchTopRatedPlacesByTags(tagIds);
        return dtos.map(mapToPlace);
    }
};
