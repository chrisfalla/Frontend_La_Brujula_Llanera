import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';
import topRatedPlacesReducer from './topRatedPlacesSlice/topRatedPlacesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    topRatedPlaces: topRatedPlacesReducer,
  },
});
