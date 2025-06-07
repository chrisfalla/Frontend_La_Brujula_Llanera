import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG } from '../../shared/constants/environment/environment';

const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json' 
  }
});

// Interceptor de solicitud
instance.interceptors.request.use(async (config) => {
  try {
    const userData = await SecureStore.getItemAsync('loggedUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (error) {
    console.error('Error al obtener token', error);
  }
  return config});

// Helpers para logging
const logRequest = (method, url) => {
  console.log(`🚀 [${method.toUpperCase()}] ${url}`);
};

const logResponse = (response) => {
  console.log('✅ Received response with status:', response.status);
  return response;
};

const logError = (error) => {
  if (error.response) {
    console.error('❌ Server responded with:', error.response.status);
  } else if (error.request) {
    console.error('❌ No response received:', error.request);
  } else {
    console.error('❌ Request error:', error.message);
  }
  return Promise.reject(error);
};

// Configurar interceptores
instance.interceptors.response.use(logResponse, logError);

// Métodos HTTP
const get = async (url, config = {}) => {
  logRequest('GET', url);
  const response = await instance.get(url, config);
  return response.data; // Devuelve directamente los datos
};

const post = async (url, data, config = {}) => {
  logRequest('POST', url);
  const response = await instance.post(url, data, config);
  return response.data;
};

// ... otros métodos (put, delete)

export default {
  get,
  post,
  put: instance.put,
  delete: instance.delete
};