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
