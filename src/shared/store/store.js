import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';
import topRatedPlacesReducer from './topRatedPlacesSlice/topRatedPlacesSlice';
import placesByTagsReducer from './placesByTagsSlice/placesByTagsSlice';
import authReducer from './authSlice/authSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    topRatedPlaces: topRatedPlacesReducer,
    placesByTags: placesByTagsReducer,
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora estos paths específicos donde hay valores no serializables
        ignoredActions: [
          'topRatedPlaces/fetchByCategory/fulfilled',
          'placesByTags/fetchByTags/fulfilled'
        ],
        ignoredPaths: [
          'topRatedPlaces.items',
          'placesByTags.items'
        ],
      },
    }),
});
