import httpClient from '../../../infraestructure/services/httpClientService';

export const fetchMostVisitedPlaces = async () => {
    const response = await httpClient.get('/home/log-visited/more-visited'); // Cambia la ruta según tu API
    return response.data; // Asegúrate de que esto devuelva los datos correctos
};
