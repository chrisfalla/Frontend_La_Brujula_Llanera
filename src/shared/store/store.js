import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice/categoriesSlice';
import topRatedPlacesReducer from './topRatedPlacesSlice/topRatedPlacesSlice';
import placesByTagsReducer from './placesByTagsSlice/placesByTagsSlice';
import authReducer from './authSlice/authSlice';
import favoritesReducer from './favoritesSlice/favoritesSlice';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    topRatedPlaces: topRatedPlacesReducer,
    placesByTags: placesByTagsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoramos estas acciones específicas donde hay valores no serializables
        ignoredActions: [
          'topRatedPlaces/fetchByCategory/fulfilled',
          'placesByTags/fetchByTags/fulfilled',
          'favorites/fetchFavorites/fulfilled',
          'favorites/addFavorite/fulfilled',
          'favorites/deleteFavorite/fulfilled',
        ],
        ignoredPaths: [
          'topRatedPlaces.items',
          'placesByTags.items',
          'favorites.favorites',
        ],
      },
    }),
});

export default store;
