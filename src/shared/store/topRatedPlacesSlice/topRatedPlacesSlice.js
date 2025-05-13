import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTopRatedPlacesByCategoryUseCase } from '../../../domain/usecases/places/getTopRatedPlacesByCategoryUseCase';

export const fetchTopRatedPlacesByCategory = createAsyncThunk(
  'topRatedPlaces/fetchByCategory',
  async (idCategory) => {
    return await getTopRatedPlacesByCategoryUseCase(idCategory);
  }
);

const topRatedPlacesSlice = createSlice({
  name: 'topRatedPlaces',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopRatedPlacesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopRatedPlacesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTopRatedPlacesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default topRatedPlacesSlice.reducer;
