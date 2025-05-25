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
      console.log(`🔍 Deleting favorite - User: ${idUserFk}, Place: ${idPlaceFk}`);
      const response = await deleteFavoriteUseCase(idUserFk, idPlaceFk);
      console.log('✅ Favorite deleted successfully:', response);
      
      // Devolver toda la información necesaria para identificar el favorito
      return { 
        idUserFk, 
        idPlaceFk,
        idPlace: idPlaceFk, // Para compatibilidad
        userId: idUserFk     // Para compatibilidad
      };
    } catch (error) {
      console.error('❌ Error deleting favorite:', error);
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
        
        // Filtrar el favorito eliminado con una comparación más flexible
        const { idUserFk, idPlaceFk } = action.payload;
        
        // Convertir los IDs a strings para comparación más segura
        const userIdStr = String(idUserFk);
        const placeIdStr = String(idPlaceFk);
        
        state.favorites = state.favorites.filter(fav => {
          // Obtener IDs del favorito con varias opciones de nombre de propiedad
          const favUserId = String(fav.idUserFk || fav.userId || '');
          const favPlaceId = String(fav.idPlaceFk || fav.idPlace || '');
          
          // Mantener todos los favoritos excepto el que estamos eliminando
          return !(favPlaceId === placeIdStr && favUserId === userIdStr);
        });
        
        console.log(`✅ [REDUX] Favorito eliminado: Place=${placeIdStr}`);
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
