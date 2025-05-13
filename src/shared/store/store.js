import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';
import topRatedPlacesReducer from './topRatedPlacesSlice/topRatedPlacesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    topRatedPlaces: topRatedPlacesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora estos paths específicos donde hay valores no serializables
        ignoredActions: ['topRatedPlaces/fetchByCategory/fulfilled'],
        ignoredPaths: ['topRatedPlaces.items'],
      },
    }),
});
