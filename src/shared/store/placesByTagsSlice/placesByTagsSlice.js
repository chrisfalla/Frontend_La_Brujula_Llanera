import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlacesByTagsUseCase } from '../../../domain/usecases/places/getPlacesByTagsUseCase';

export const fetchPlacesByTags = createAsyncThunk(
  'placesByTags/fetchByTags',
  async (tagIds) => {
    return await getPlacesByTagsUseCase(tagIds);
  }
);

const placesByTagsSlice = createSlice({
  name: 'placesByTags',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearPlacesByTags: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlacesByTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlacesByTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPlacesByTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearPlacesByTags } = placesByTagsSlice.actions;
export default placesByTagsSlice.reducer;
