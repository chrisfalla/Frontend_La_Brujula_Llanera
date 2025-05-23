import httpClient from '../../services/httpClientService';

// Función auxiliar para reintento de peticiones
const retryRequest = async (fn, maxRetries = 2, delay = 1000) => {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      // Solo reintentar para errores de servidor (5xx)
      if (error.response && error.response.status >= 500 && error.response.status < 600) {
        console.log(`🔄 Reintento ${attempt + 1}/${maxRetries} después de ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        // Aumentamos el tiempo de espera entre reintentos
        delay *= 2;
      } else {
        // Si no es un error 5xx, no reintentamos
        throw error;
      }
    }
  }
  throw lastError;
};

export const registerUserApi = async (userData) => {
  const response = await httpClient.post('/user/register', userData);
  return response; // El `httpClient` ya devuelve `response.data`
};

export const loginUserApi = async (credentials) => {
  const response = await httpClient.post('/user/login', credentials);
  return response;
};

export const requestPasswordRecoveryCodeApi = async (email) => {
  console.log('📡 [API] Enviando solicitud de código para:', email);
  try {
    const makeRequest = () => httpClient.post('/recovery/code', { email });
    const response = await retryRequest(makeRequest, 2, 1500);
    console.log('✅ [API] Respuesta de código de recuperación:', response);
    return response;
  } catch (error) {
    console.error('❌ [API] Error en solicitud de código:', error);
    
    // Información específica para errores del servidor
    if (error.response && error.response.status === 503) {
      console.log('🛑 El servidor está temporalmente no disponible');
      error.userMessage = "El servicio está temporalmente no disponible. Por favor intenta más tarde.";
    }
    
    throw error;
  }
};

export const verifyPasswordRecoveryCodeApi = async (email, code) => {
  console.log('📡 [API] Verificando código de recuperación para:', email);
  console.log('📋 [API] Datos enviados:', { email, code });
  try {
    // Asegurarnos de que el código sea una cadena de texto
    const formattedCode = String(code).trim();
    
    const response = await httpClient.post('/recovery/validate', { 
      email: email.trim(),
      code: formattedCode
    });
    
    console.log('✅ [API] Respuesta de verificación:', response);
    return response;
  } catch (error) {
    console.error('❌ [API] Error al verificar código:', error);
    
    // Log más detallado de la respuesta de error
    if (error.response) {
      console.error('📄 [API] Detalles del error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    
    throw error;
  }
};

export const resetPasswordApi = async (email, code, password) => {
  console.log('📡 [API] Solicitando cambio de contraseña para:', email);
  try {
    const response = await httpClient.post('/recovery/forgot-password', { email, code, password });
    console.log('✅ [API] Contraseña cambiada exitosamente:', response);
    return response;
  } catch (error) {
    console.error('❌ [API] Error al cambiar contraseña:', error);
    throw error;
  }
};