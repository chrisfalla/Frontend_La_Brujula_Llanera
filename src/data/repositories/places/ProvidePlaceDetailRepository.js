import config from "../../../shared/constants/environment/environment";
import { PlaceDetailMockApi } from "../../datasources/places/PlaceDetailMockApi";
import { PlaceDetailApi } from "../../datasources/places/PlaceDetailApi";
import { PlaceDetailRepositoryImpl } from "./PlaceDetailRepositoryImpl";

export function providePlaceDetailRepository() {
    const datasource = config.USE_MOCK_DETAIL_PLACES
        ? new PlaceDetailMockApi()
        : new PlaceDetailApi();

    return new PlaceDetailRepositoryImpl(datasource);
} 