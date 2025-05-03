import axios from 'axios';
import { API_CONFIG } from '../../../shared/constants/environment/environment';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_CONFIG.BASE_URL}/categories`);
  return response.data;
};

export const fetchMostTappedCategories = async () => {
  const response = await axios.get(`${API_CONFIG.BASE_URL}/categorias/mas-tocadas`);
  return response.data;
};
