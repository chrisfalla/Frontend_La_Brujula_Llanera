import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';
import favoritesReducer from './favoritesSlice/favoritesSlice'; // Añadir esta importación

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    favorites: favoritesReducer, // Registrar el nuevo reducer
  },
});
