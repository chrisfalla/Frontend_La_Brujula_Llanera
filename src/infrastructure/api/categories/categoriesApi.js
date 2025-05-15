import httpClient from '../../services/httpClientService';

export const fetchCategories = async () => {
  try {
    const data = await httpClient.get('/categories'); 
    // httpClient.get ya retorna res.data directamente
    console.log('✅ [API] fetchCategories:', data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('❌ [API] fetchCategories error:', error);
    return [];
  }
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
