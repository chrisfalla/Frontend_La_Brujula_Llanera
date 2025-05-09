import { placesDatasource } from '../../data/datasources/places/mostVisitedPlacesDataSources';

export const getMostVisitedPlacesUseCase = async () => {
    return await placesDatasource.getMostVisitedPlaces();
};
