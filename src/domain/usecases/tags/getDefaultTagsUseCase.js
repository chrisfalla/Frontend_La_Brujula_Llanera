import { tagsRepository } from '../../../data/repositories/tags/tagsRepository';

export const getDefaultTagsUseCase = async () => {
  const tags = await tagsRepository.getDefaultTags();
  return tags;
};