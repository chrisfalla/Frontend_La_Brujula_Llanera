import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
