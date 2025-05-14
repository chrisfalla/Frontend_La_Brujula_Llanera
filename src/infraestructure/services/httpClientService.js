import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://backend-la-brujula-llanera.onrender.com', // URL base correcta
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log para depuración
console.log('API base URL configurada:', httpClient.defaults.baseURL);

export default httpClient;
