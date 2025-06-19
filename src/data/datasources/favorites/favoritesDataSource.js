// favoritesDataSource.js
import { getFavorites } from '../../../infrastructure/api/favorites/favoritesApi';
import { Favorite } from '../../../domain/models/favorites/favorite';

export const FavoritesDataSource = {
    getFavoritesUseCase: async (userId) => {
        const dtos = await getFavorites(userId);
        return dtos.map(mapToPlace);
    }
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