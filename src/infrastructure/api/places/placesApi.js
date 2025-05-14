import httpClient from '../../services/httpClientService';

export const fetchMostVisitedPlaces = async () => {
    try {
        // httpClient.get ya retorna res.data
        const data = await httpClient.get('/home/log-visited/more-visited');
        console.log('✅ [API] fetchMostVisitedPlaces response:', data);
        return Array.isArray(data) ? data : [];   // Asegura siempre un arreglo
    } catch (error) {
        console.error('❌ [API] fetchMostVisitedPlaces error:', error);
        return [];
    }
};

export const fetchTopRatedPlacesByCategory = async (idCategory) => {
    try {
        // Corregir la ruta para seguir la estructura de otros endpoints
        const data = await httpClient.get(`/home/top-rated/${idCategory}`);
        console.log('✅ [API] fetchTopRatedPlacesByCategory response:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('❌ [API] fetchTopRatedPlacesByCategory error:', error);
        return [];
    }
};

export const fetchTopRatedPlacesByTags = async (tagIds) => {
    try {
        // Si el API espera múltiples parámetros en lugar de separados por comas
        let url = '/home/top-rated-by-tags';
        
        if (Array.isArray(tagIds) && tagIds.length > 0) {
            // Construir la URL con múltiples parámetros tagId (tagId=1&tagId=2)
            const params = tagIds.map(id => `tagId=${id}`).join('&');
            url += `?${params}`;
        } else if (tagIds) {
            // Un solo tagId
            url += `?tagId=${tagIds}`;
        }
        
        console.log('🔍 Intentando URL:', url);
        const data = await httpClient.get(url);
        console.log('✅ [API] fetchTopRatedPlacesByTags response:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('❌ [API] fetchTopRatedPlacesByTags error:', error);
        return [];
    }
};
