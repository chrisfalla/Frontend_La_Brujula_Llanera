export class GetTagsUseCase{
    constructor(tagsRepository){
        this.tagsRepository = tagsRepository;
    }
    async execute(){
        return await this.tagsRepository.getTags();
    }
}