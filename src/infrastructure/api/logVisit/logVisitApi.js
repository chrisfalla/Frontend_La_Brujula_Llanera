import httpClient from '../../services/httpClientService';

export const logPlaceVisit = async ({ idPlace, idUserFk }) => {
  try {
    // Payload fijo para el backend
    const payload = {
      idDeviceInfoFk: 1,
      idPlaceFk: idPlace,
      idUserFk: idUserFk,
    };

    console.log('📤 [API] Payload enviado:', JSON.stringify(payload, null, 2));

    const response = await httpClient.post('/log', payload);

    console.log('✅ [API] Visita registrada correctamente:', response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('❌ [API] Error al registrar visita:', error.response.data);
      console.error('❌ [API] Status:', error.response.status);
      console.error('❌ [API] URL:', error.config?.url);
    } else {
      console.error('❌ [API] Error al registrar visita:', error.message);
    }
    return {
      success: false,
      error: error.message,
      details: error.response?.data,
      status: error.response?.status,
    };
  }
};
