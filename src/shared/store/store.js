import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';
import authReducer from './authSlice/authSlice';
import favoritesReducer from './favoritesSlice/favoritesSlice'; // Añadir esta importación

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    auth:authReducer
    favorites: favoritesReducer, // Registrar el nuevo reducer
  },
});
