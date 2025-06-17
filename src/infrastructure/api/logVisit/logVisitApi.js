import httpClient from '../../services/httpClientService';

export const logPlaceVisit = async ({ idPlace, idUserFk }) => {
    // Payload fijo para el backend
    const payload = {
      idDeviceInfoFk: 1,
      idPlaceFk: idPlace,
      idUserFk: idUserFk,
    };

    try {
        const response = await httpClient.post('/log', payload);
        return response;
    } catch (error) {
        return {
          success: false,
          error: error.message,
          details: error.response?.data,
          status: error.response?.status,
        };
    }
};
