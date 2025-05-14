import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoritesUseCase } from '../../../domain/usecases/favorites/getFavoritesUseCase';
import { favoritesRepository } from '../../../data/repositories/favorites/favoritesRepository';

// Esta es la acción asíncrona que debes importar en FavoritesScreen
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    const getFavorites = getFavoritesUseCase(favoritesRepository);
    return await getFavorites();
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [], // Array vacío por defecto
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default favoritesSlice.reducer;