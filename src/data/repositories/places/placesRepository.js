import { placesDatasource } from '../../datasources/places/mostVisitedPlacesDataSources';
import { topRatedPlacesDatasource } from '../../datasources/places/topRatedPlacesDataSource';
import { placesByTagsDataSource } from '../../datasources/places/placesByTagsDataSource';
import { placesCategoryDataSource } from '../../datasources/places/placesByCategoryDataSource';
import { searchPlacesDataSource } from '../../datasources/places/searchPlacesDataSource';
import { placeDetailsDataSource } from '../../datasources/places/placeDetailsDataSource';

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
  getPlacesByCategory: async (idCategory) => {
    return await placesCategoryDataSource.getPlacesByCategory(idCategory);
  },
  searchPlaces: async (query, location, radius) => {
    return await searchPlacesDataSource.searchPlaces(query, location, radius);
  },
  getPlaceDetails: async (placeId) => {
    return await placeDetailsDataSource.getPlaceDetails(placeId);
  }
};
