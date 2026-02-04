import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productionApi } from '../../services/api';

export const calculateProduction = createAsyncThunk(
  'production/calculate',
  async () => {
    const response = await productionApi.calculate();
    return response.data;
  }
);

const productionSlice = createSlice({
  name: 'production',
  initialState: {
    report: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateProduction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateProduction.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(calculateProduction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = productionSlice.actions;
export default productionSlice.reducer;
