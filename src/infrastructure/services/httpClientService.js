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
    // Error silencioso al obtener token
  }
  return config
});

// Configurar interceptores
instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

// Métodos HTTP
const get = async (url, config = {}) => {
  const response = await instance.get(url, config);
  return response.data; // Devuelve directamente los datos
};

const post = async (url, data, config = {}) => {
  const response = await instance.post(url, data, config);
  return response.data;
};

const put = async (url, data, config = {}) => {
  const response = await instance.put(url, data, config);
  return response.data;
};

const del = async (url, config = {}) => {
  const response = await instance.delete(url, config);
  return response.data;
};

export default {
  get,
  post,
  put,
  delete: del
};