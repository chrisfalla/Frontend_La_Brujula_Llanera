import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesUseCase } from '../../../domain/usecases/categories/getCategoriesUseCase';
import { categoriesRepository } from '../../../data/repositories/categories/categoriesRepository';

// Async thunk
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const getCategories = getCategoriesUseCase(categoriesRepository);
    const categories = await getCategories();
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      isDefault: cat.isDefault,
    }));
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    all: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => { state.status = 'loading'; })
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
