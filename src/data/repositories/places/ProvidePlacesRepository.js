// data/repositories/places/ProvidePlacesRepository.js
import config from "../../../shared/constants/environment/environment";
import { PlaceRepositoryImpl } from "./PlaceRepositorylmpl";
import { PlaceByTagsMockApi } from "../../datasources/places/PlacesByTagsMockApi";
import { PlaceByCategoryMockApi } from "../../datasources/places/PlacesByCategoryMockApi";
import { PlaceMoreVisitedMockApi } from "../../datasources/places/PlacesMoreVisitedMockApi";

export function providePlacesByTagsRepository() {
    const datasource = new PlaceByTagsMockApi();
    return new PlaceRepositoryImpl(datasource);
}

export function providePlacesByCategoryRepository() {
    const datasource = new PlaceByCategoryMockApi();
    return new PlaceRepositoryImpl(datasource);
}

export function providePlacesMoreVisitedRepository() {
    const datasource = new PlaceMoreVisitedMockApi();
    return new PlaceRepositoryImpl(datasource);
}
