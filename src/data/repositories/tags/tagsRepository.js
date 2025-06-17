import { fetchTags, fetchDefaultTags } from '../../../infrastructure/api/tags/tagsApi';
import { Tag } from '../../../domain/models/tags/Tag';

const mapToTag = dto => {
  if (!dto) {
    return null;
  }
  
  const tag = new Tag({
    idTag: dto.idTag || dto.id || 0,
    tagName: dto.tagName || dto.name || '',
    isDefault: !!dto.isDefault
  });
  return tag;
};

export const tagsRepository = {
  getTags: async () => {
    const dtos = await fetchTags();
    
    if (!Array.isArray(dtos)) {
      return [];
    }
    
    const tags = dtos.map(mapToTag).filter(Boolean);
    return tags;
  },
  getDefaultTags: async () => {
    const dtos = await fetchDefaultTags();
    
    if (!Array.isArray(dtos)) {
      return [];
    }
    
    const tags = dtos.map(mapToTag).filter(Boolean);
    return tags;
  },
};