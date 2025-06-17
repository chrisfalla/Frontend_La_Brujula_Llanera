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
  const makeRequest = () => httpClient.post('/recovery/code', { email });
  const response = await retryRequest(makeRequest, 2, 1500);
  return response;
};

export const verifyPasswordRecoveryCodeApi = async (email, code) => {
  // Asegurarnos de que el código sea una cadena de texto y validar formato
  const formattedCode = String(code).trim();
  
  // Validación básica del código antes de enviarlo
  if (!formattedCode) {
    throw new Error('El código de verificación no puede estar vacío');
  }
  
  if (formattedCode.length < 4) {
    throw new Error('El código debe tener al menos 4 caracteres');
  }
  
  const response = await httpClient.post('/recovery/validate', { 
    email: email.trim(),
    code: formattedCode
  });
  
  return response;
};

// Esta función puede ser reutilizada tanto para recuperación como para cambio de contraseña
export const resetPasswordApi = async (email, newPassword) => {
  if (!email || !newPassword) {
    throw new Error('Email y nueva contraseña son requeridos');
  }
  const payload = {
    email: email.trim(),
    newPassword
  };
  const response = await httpClient.post('/user/forgot-password', payload);
  return response;
};

export const usersApi = {
  updateUser: async ({ idUser, names, email, phone }) => {
    const path = "/user/update";
    const response = await httpClient.post(path, { idUser, names, email, phone });
    // Si la respuesta tiene .data, úsala, si no, retorna el objeto plano
    return response && response.data ? response.data : response;
  },
};