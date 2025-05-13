import { tagsRepository } from '../../../data/repositories/tags/tagsRepository';

export const getDefaultTagsUseCase = async () => {
  try {
    console.log('🔍 [USE-CASE] Solicitando tags por defecto');
    const tags = await tagsRepository.getDefaultTags();
    console.log('✅ [USE-CASE] Tags por defecto obtenidos:', JSON.stringify(tags, null, 2));
    return tags;
  } catch (error) {
    console.error('🚨 [USE-CASE] Error obteniendo tags por defecto:', error);
    throw error;
  }
};
