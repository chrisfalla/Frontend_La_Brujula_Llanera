import config from "../../../shared/constants/environment/environment";
import {TagsApi} from "../../../data/datasources/tags/TagsApi"
import { TagsMockApi } from "../../../data/datasources/tags/TagsMockApi";
import { TagsRepositoryImpl } from "./TagsRepositoryImpl";

export function provideTagsRepository (){
    const datasource = config.USE_MOCK_TAGS
    ? new TagsMockApi()
    : new TagsApi();

    return new TagsRepositoryImpl(datasource)
}