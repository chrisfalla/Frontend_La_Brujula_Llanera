import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';
import authReducer from './authSlice/authSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    auth:authReducer
  },
});
