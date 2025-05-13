export class Tag {
    constructor({ idTag, tagName, isDefault }) {
        this.idTag = idTag;
        this.tagName = tagName;
        this.isDefault = isDefault;
    }
}
export class TagMapper {
    static toDomain(tag) {
        return new Tag({
            idTag: tag.idTag,
            tagName: tag.tagName,
            isDefault: tag.isDefault,
        });
    }
}