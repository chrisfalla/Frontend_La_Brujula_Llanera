// src/presentation/slices/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFavorites(state, action) {
      state.favorites = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setFavorites, setLoading, setError } = favoritesSlice.actions;
export default favoritesSlice.reducer;