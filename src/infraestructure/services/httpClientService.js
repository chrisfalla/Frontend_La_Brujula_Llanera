import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../shared/constants/environment/environment';

const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Token por header (comentado por ahora)
// instance.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Manejo de errores
instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;

    if (!response) console.error('❌ Error de red');
    else if (response.status === 401) console.warn('⚠️ No autorizado');
    else if (response.status === 500) console.error('💥 Error del servidor');

    return Promise.reject(error);
  }
);

// 👉 Logging helper
const logRequest = (method, url, data) => {
  console.log(`📡 [${method.toUpperCase()}] Request to: ${url}`);
  if (data) console.log('📤 Payload:', JSON.stringify(data, null, 2));
};

const logResponse = (data) => {
  console.log('✅ Response:', JSON.stringify(data, null, 2));
};

// Métodos genéricos
const get = async (url, config = {}) => {
  logRequest('get', url);
  const res = await instance.get(url, config);
  logResponse(res.data);
  return res.data;
};

const post = async (url, data, config = {}) => {
  logRequest('post', url, data);
  const res = await instance.post(url, data, config);
  logResponse(res.data);
  return res.data;
};

const put = async (url, data, config = {}) => {
  logRequest('put', url, data);
  const res = await instance.put(url, data, config);
  logResponse(res.data);
  return res.data;
};

const del = async (url, config = {}) => {
  logRequest('delete', url);
  const res = await instance.delete(url, config);
  logResponse(res.data);
  return res.data;
};

export default {
  get,
  post,
  put,
  delete: del
};
