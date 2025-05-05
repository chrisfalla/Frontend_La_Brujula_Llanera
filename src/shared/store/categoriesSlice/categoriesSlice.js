import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesUseCase } from '../../../domain/usecases/categories/getCategoriesUseCase'; // Asegúrate de importar la función

// Supón que tienes un repository para obtener las categorías.
import { categoriesRepository } from '../../../data/repositories/categories/categoriesRepository';


// Async thunk para traer categorías del backend
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
      const getCategories = getCategoriesUseCase(categoriesRepository);
      const categories = await getCategories();
  
      // Mapeamos a plain JS objects (dato simple)
      const plainCategories = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        isDefault: cat.isDefault,
      }));
  
      return plainCategories;
    }
  );
  

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
      all: [],
      status: 'idle', // 'loading', 'succeeded', 'failed'
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.all = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    }
  });
  

export default categoriesSlice.reducer;
