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
    
    console.log('✅ [API] Respuesta de verificación:', response);
    
    // Verificar si la respuesta contiene el ID del usuario (para cuando se implemente en backend)
    if (response && response.idUser) {
      console.log('👤 [API] ID de usuario obtenido de la validación:', response.idUser);
    } else {
      console.warn('⚠️ [API] La respuesta de validación no contiene ID de usuario');
    }
    
    return response;
  } catch (error) {
    console.error('❌ [API] Error al verificar código:', error);
    
    // Manejo específico de errores de validación
    if (error.response) {
      console.error('📄 [API] Detalles del error:', {
        status: error.response.status,
        data: error.response.data
      });
      
      // Crear mensajes de error más específicos
      if (error.response.status === 400) {
        const errorMessage = error.response.data?.message || 'Código inválido';
        if (errorMessage.toLowerCase().includes('invalid code')) {
          error.userMessage = 'El código ingresado es incorrecto o ha expirado. Por favor verifique e intente nuevamente.';
        } else if (errorMessage.toLowerCase().includes('expired')) {
          error.userMessage = 'El código ha expirado. Por favor solicite un nuevo código.';
        } else {
          error.userMessage = 'Código de verificación inválido. Verifique que esté correctamente escrito.';
        }
      } else if (error.response.status === 404) {
        error.userMessage = 'No se encontró una solicitud de recuperación activa para este email.';
      } else if (error.response.status === 429) {
        error.userMessage = 'Demasiados intentos de validación. Por favor espere unos minutos.';
      }
    } else if (error.message.includes('Network Error')) {
      error.userMessage = 'Error de conexión. Verifique su conexión a internet.';
    }
    
    throw error;
  }
};

// Función mejorada con diagnóstico y múltiples formatos de payload
export const resetPasswordApi = async (email, newPassword) => {
  console.log('📡 [API] Solicitando cambio de contraseña para:', email);
  try {
    if (!email || !newPassword) {
      throw new Error('Email y nueva contraseña son requeridos');
    }
    const payload = {
      email: email.trim(),
      newPassword
    };
    console.log('📤 [API] Payload final para cambio de contraseña:', payload);
    const response = await httpClient.post('/user/forgot-password', payload);
    console.log('✅ [API] Contraseña cambiada exitosamente:', response);
    return response;
  } catch (error) {
    console.error('❌ [API] Error al cambiar contraseña:', error);
    if (error.response) {
      console.error('📄 [API] Detalles del error:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    throw error;
  }
};
export const usersApi = {
  updateUser: async ({ idUser, names, email, phone }) => {
    const path = "/user/update";
    console.log("🚀 [API] POST a:", path);
    console.log("📤 [API] Payload:", { idUser, names, email, phone });
    const response = await httpClient.post(path, { idUser, names, email, phone });
    // Si la respuesta tiene .data, úsala, si no, retorna el objeto plano
    return response && response.data ? response.data : response;
  },
};