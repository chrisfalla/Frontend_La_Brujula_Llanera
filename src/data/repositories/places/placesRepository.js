import { placesDatasource } from '../../datasources/places/mostVisitedPlacesDataSources';
import { topRatedPlacesDatasource } from '../../datasources/places/topRatedPlacesDataSource';

export const placesRepository = {
  getMostVisitedPlaces: async () => {
    return await placesDatasource.getMostVisitedPlaces();
  },
  getTopRatedPlacesByCategory: async (idCategory) => {
    return await topRatedPlacesDatasource.getTopRatedPlacesByCategory(idCategory);
  },
};
