export class TagsRepositoryImpl {
    constructor(datasource){
        this.datasource = datasource
    }
    async getTags(){
        return await this.datasource.fetchTags();
    }
}