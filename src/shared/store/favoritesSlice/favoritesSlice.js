import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoritesUseCase } from '../../../domain/usecases/favorites/getFavoritesUseCase';
import { addFavoriteUseCase } from '../../../domain/usecases/favorites/addFavoriteUseCase';
import { deleteFavoriteUseCase } from '../../../domain/usecases/favorites/deleteFavoriteUseCase';

// Función para asegurar que un objeto es serializable
const toSerializable = (obj) => {
  if (!obj) return null;
  
  // Crear un objeto plano serializable
  return {
    idPlace: obj.idPlace || obj.id || 0,
    idPlaceFk: obj.idPlaceFk || obj.idPlace || obj.id || 0,
    name: obj.name || obj.placeName || '',
    rating: typeof obj.rating === 'number' ? obj.rating : 0,
    imageUrl: typeof obj.imageUrl === 'string' ? obj.imageUrl : '',
    categoryName: obj.categoryName || obj.category || '',
    userId: obj.userId || obj.idUser || obj.idUserFk || 0,
    idUserFk: obj.idUserFk || obj.userId || obj.idUser || 0,
    timestamp: Date.now() // Añadir timestamp para asegurar que es un objeto nuevo
  };
};

// Thunks para operaciones asíncronas
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const favorites = await getFavoritesUseCase(userId);
      
      // Convertir todos los objetos a formato serializable
      const serializableFavorites = Array.isArray(favorites) 
        ? favorites.map(toSerializable).filter(Boolean)
        : [];
        
      return serializableFavorites;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener favoritos');
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ idUserFk, idPlaceFk }, { rejectWithValue }) => {
    try {
      await addFavoriteUseCase(idUserFk, idPlaceFk);
      
      // Devolver un objeto plano serializable
      return toSerializable({ 
        idUserFk, 
        idPlaceFk,
        idPlace: idPlaceFk,
        userId: idUserFk
      });
    } catch (error) {
      return rejectWithValue(error.message || 'Error al agregar favorito');
    }
  }
);

export const deleteFavorite = createAsyncThunk(
  'favorites/deleteFavorite',
  async ({ idUserFk, idPlaceFk }, { rejectWithValue }) => {
    try {
      await deleteFavoriteUseCase(idUserFk, idPlaceFk);
      
      // Devolver objeto plano serializable
      return { 
        idUserFk, 
        idPlaceFk,
        idPlace: idPlaceFk,
        userId: idUserFk
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Error al eliminar favorito');
    }
  }
);

// Configuración del slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearFavorites(state) {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Asegurarnos de que todos son objetos planos
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      
      // Add favorite
      .addCase(addFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const exists = state.favorites.some(
          fav => (String(fav.idPlaceFk || fav.idPlace) === String(action.payload.idPlaceFk))
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
      
      // Delete favorite
      .addCase(deleteFavorite.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        const placeIdStr = String(action.payload.idPlaceFk || action.payload.idPlace);
        
        state.favorites = state.favorites.filter(fav => {
          const favPlaceId = String(fav.idPlaceFk || fav.idPlace);
          return favPlaceId !== placeIdStr;
        });
        
        state.error = null;
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// Función auxiliar para verificar si un lugar es favorito
export const isFavorite = (favorites, placeId) => {
  if (!placeId || !Array.isArray(favorites)) return false;
  
  const placeIdStr = String(placeId);
  return favorites.some(fav => {
    const favPlaceId = fav.idPlaceFk || fav.idPlace;
    return String(favPlaceId) === placeIdStr;
  });
};

