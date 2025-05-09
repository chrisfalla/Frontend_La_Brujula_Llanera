import httpClient from '../../services/httpClientService';

export const fetchMostVisitedPlaces = async () => {
    try {
        // httpClient.get ya retorna res.data
        const data = await httpClient.get('/home/log-visited/more-visited');
        console.log('Response from API:', data);   // data es ya el arreglo
        return Array.isArray(data) ? data : [];   // Asegura siempre un arreglo
    } catch (error) {
        console.error('Error al obtener los lugares más visitados:', error);
        return [];
    }
};
