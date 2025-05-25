import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoritesUseCase } from '../../../domain/usecases/favorites/getFavoritesUseCase';
import { addFavoriteUseCase } from '../../../domain/usecases/favorites/addFavoriteUseCase';
import { deleteFavoriteUseCase } from '../../../domain/usecases/favorites/deleteFavoriteUseCase';

// Thunks para operaciones asíncronas
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      console.log('🔍 [REDUX] Obteniendo favoritos para el usuario:', userId);
      const favorites = await getFavoritesUseCase(userId);
      console.log('✅ [REDUX] Favoritos obtenidos:', favorites.length);
      return favorites;
    } catch (error) {
      console.error('❌ [REDUX] Error al obtener favoritos:', error);
      return rejectWithValue(error.message || 'Error al obtener favoritos');
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ idUserFk, idPlaceFk }, { rejectWithValue }) => {
    try {
      console.log(`🔍 [REDUX] Agregando favorito - Usuario: ${idUserFk}, Lugar: ${idPlaceFk}`);
      const response = await addFavoriteUseCase(idUserFk, idPlaceFk);
      console.log('✅ [REDUX] Favorito agregado correctamente');
      
      // Devolver un objeto con la estructura que el reducer necesita
      return { 
        idUserFk, 
        idPlaceFk,
        // Incluimos también estos campos para compatibilidad
        idPlace: idPlaceFk,
        userId: idUserFk
      };
    } catch (error) {
      console.error('❌ [REDUX] Error al agregar favorito:', error);
      return rejectWithValue(error.message || 'Error al agregar favorito');
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorites/deleteFavorite',
  async ({ idUserFk, idPlaceFk }, { rejectWithValue }) => {
    try {
      console.log(`🔍 [REDUX] Eliminando favorito - Usuario: ${idUserFk}, Lugar: ${idPlaceFk}`);
      const response = await deleteFavoriteUseCase(idUserFk, idPlaceFk);
      console.log('✅ [REDUX] Favorito eliminado correctamente');
      
      // Devolver un objeto con la estructura que el reducer necesita
      return { 
        idUserFk, 
        idPlaceFk,
        // Incluimos también estos campos para compatibilidad
        idPlace: idPlaceFk,
        userId: idUserFk
      };
    } catch (error) {
      console.error('❌ [REDUX] Error al eliminar favorito:', error);
      return rejectWithValue(error.message || 'Error al eliminar favorito');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Mantenemos los reducers simples para compatibilidad
    setFavorites(state, action) {
      state.favorites = action.payload;
      state.error = null;
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Manejo del estado para fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      
      // Manejo del estado para addFavorite
      .addCase(addFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Verificar si el favorito ya existe (para evitar duplicados)
        const exists = state.favorites.some(
          fav => (fav.idPlaceFk === action.payload.idPlaceFk && fav.idUserFk === action.payload.idUserFk) ||
                 (fav.idPlace === action.payload.idPlaceFk && fav.userId === action.payload.idUserFk)
        );
        
        if (!exists) {
          state.favorites.push(action.payload);
        }
        
        state.error = null;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      
      // Manejo del estado para deleteFavorite
      .addCase(deleteFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Filtrar para eliminar el favorito
        state.favorites = state.favorites.filter(
          fav => !((fav.idPlaceFk === action.payload.idPlaceFk && fav.idUserFk === action.payload.idUserFk) ||
                  (fav.idPlace === action.payload.idPlaceFk && fav.userId === action.payload.idUserFk))
        );
        
        state.error = null;
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

// Exportar acciones y reducer
export const { setFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
