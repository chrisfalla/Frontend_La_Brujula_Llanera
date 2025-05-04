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
          console.log('Categorías: Acción en estado "loading"'); // Log cuando la acción está en estado de carga
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          console.log('Categorías recibidas en "fulfilled":', action.payload); // Log cuando la acción se ha completado
          state.status = 'succeeded';
          state.all = action.payload;
          console.log('Estado actualizado de categorías:', state.all); // Log del estado después de la acción
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          console.log('Error en la carga de categorías:', action.error.message); // Log de error
        });
    }
  });
  

export default categoriesSlice.reducer;
