import { fetchTags, fetchDefaultTags } from '../../../infrastructure/api/tags/tagsApi';
import { Tag } from '../../../domain/models/tags/Tag';

const mapToTag = dto => new Tag({
  idTag: dto.idTag,
  tagName: dto.name || dto.tagName || '', // Aceptamos tanto name como tagName
  isDefault: dto.isDefault,
});

export const tagsDatasource = {
  getTags: async () => {
    const dtos = await fetchTags();
    return dtos.map(mapToTag);
  },
  getDefaultTags: async () => {
    const dtos = await fetchDefaultTags();
    return dtos.map(mapToTag);
  },
};
