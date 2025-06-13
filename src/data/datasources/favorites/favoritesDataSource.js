// favoritesDataSource.js
import { fetchFavoritesUseCase, fetchFavoritesDefaultUseCase } from '../../../infrastructure/api/favorites/favoritesApi';
import { Favorite } from '../../../domain/models/favorites/favorite';

export const FavoritesDataSource = {
    getFavoritesUseCase: async () => {
        const dtos = await fetchFavoritesUseCase();
        return dtos.map(mapToPlace);
    },
    getDefaultFavoritesUseCase: async () => {
        const dtos = await fetchFavoritesDefaultUseCase();
        return dtos.map(mapToPlace);
    },
};

const mapToPlace = dto => {
    const fixedImageUrl = dto.imageUrl?.replace('httpss://', 'https://');
    return new Favorite({
        idPlace: dto.idPlace,
        name: dto.name ?? dto.placeName ?? '',
        imageUrl: fixedImageUrl ?? dto.imageUrl ?? '',
        rating: dto.rating ?? dto.ratingStars ?? 0,
        categoryName: dto.categoryName ?? '',
        userId: dto.userId ?? '',
    });
};
