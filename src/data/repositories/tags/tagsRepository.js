import { fetchTags, fetchDefaultTags } from '../../../infrastructure/api/tags/tagsApi';
import { Tag } from '../../../domain/models/tags/Tag';

const mapToTag = dto => {
  if (!dto) {
    return null;
  }
  
  try {
    const tag = new Tag({
      idTag: dto.idTag || dto.id || 0,
      tagName: dto.tagName || dto.name || '',
      isDefault: !!dto.isDefault
    });
    return tag;
  } catch (error) {
    return null;
  }
};

export const tagsRepository = {
  getTags: async () => {
    try {
      const dtos = await fetchTags();
      
      if (!Array.isArray(dtos)) {
        return [];
      }
      
      const tags = dtos.map(mapToTag).filter(Boolean);
      return tags;
    } catch (error) {
      return [];
    }
  },
  getDefaultTags: async () => {
    try {
      const dtos = await fetchDefaultTags();
      
      if (!Array.isArray(dtos)) {
        return [];
      }
      
      const tags = dtos.map(mapToTag).filter(Boolean);
      return tags;
    } catch (error) {
      return [];
    }
  },
};
