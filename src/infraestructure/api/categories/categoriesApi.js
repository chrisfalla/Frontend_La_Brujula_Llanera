// src/dominio/api/categoriesApi.js
import httpClient from '../../../infraestructure/services/httpClientService';

export const fetchCategories = async () => {
  const response = await httpClient.get('/categories');
  return response; // ya es .data desde httpClient
};

export const fetchMostTappedCategories = async () => {
  const response = await httpClient.get('/categorias/mas-tocadas');
  return response;
};
