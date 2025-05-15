import { placesDatasource } from '../../datasources/places/mostVisitedPlacesDataSources';
import { topRatedPlacesDatasource } from '../../datasources/places/topRatedPlacesDataSource';
import { placesByTagsDataSource } from '../../datasources/places/placesByTagsDataSource';

export const placesRepository = {
  getMostVisitedPlaces: async () => {
    return await placesDatasource.getMostVisitedPlaces();
  },
  getTopRatedPlacesByCategory: async (idCategory) => {
    return await topRatedPlacesDatasource.getTopRatedPlacesByCategory(idCategory);
  },
  getTopRatedPlacesByTags: async (tagIds) => {
    return await placesByTagsDataSource.getTopRatedPlacesByTags(tagIds);
  },
};
