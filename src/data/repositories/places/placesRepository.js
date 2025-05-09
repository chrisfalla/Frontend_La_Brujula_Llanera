import { placesDatasource } from '../../datasources/places/mostVisitedPlacesDataSources';

export const placesRepository = {
  getMostVisitedPlaces: async () => {
    return await placesDatasource.getMostVisitedPlaces();
  },
};
