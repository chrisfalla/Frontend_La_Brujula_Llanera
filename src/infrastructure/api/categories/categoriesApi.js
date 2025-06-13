import httpClient from '../../services/httpClientService';

export const fetchCategories = async () => {
    const data = await httpClient.get('/categories'); 
    // httpClient.get ya retorna res.data directamente
    return Array.isArray(data) ? data : [];
};

export const fetchMostTappedCategories = async () => {
  try {
    const data = await httpClient.get('/categorias/mas-tocadas');
    console.log('✅ [API] fetchMostTappedCategories:', data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('❌ [API] fetchMostTappedCategories error:', error);
    return [];
  }
};
