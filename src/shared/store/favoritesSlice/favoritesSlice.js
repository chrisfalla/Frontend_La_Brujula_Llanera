import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoritesUseCase } from '../../../domain/usecases/favorites/getFavoritesUseCase';
import { favoritesRepository } from '../../../data/repositories/favorites/favoritesRepository';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    try {
      console.log('Ejecutando fetchFavorites thunk');
      const getFavorites = getFavoritesUseCase(favoritesRepository);
      const favoritesData = await getFavorites();
      
      console.log('Datos crudos recibidos:', favoritesData);
      
      // Mapeo adaptativo que maneja diferentes estructuras de datos
      return favoritesData.map(fav => {
        // Normaliza la estructura del objeto
        const item = {
          id: fav.id || fav._id || String(Math.random()),
          name: fav.name || fav.placeName || fav.title || `Lugar ${(fav.id || '').substring(0, 4)}`,
          categoryId: fav.categoryId || fav.category_id || 'General',
          categoryName: fav.categoryName || fav.category_name || 'Categoría',
          image: fav.imageUrl || fav.image || fav.photo || 'https://via.placeholder.com/150',
          location: fav.location || fav.address || 'Llanos Orientales',
          rating: fav.rating || fav.stars || 4.5,
          userId: fav.userId || fav.user_id || '11'
        };
        
        console.log('Item procesado:', item);
        return item;
      });
    } catch (error) {
      console.error('Error en fetchFavorites thunk:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
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