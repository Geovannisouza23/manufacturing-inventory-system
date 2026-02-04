import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rawMaterialsApi } from '../../services/api';

export const fetchRawMaterials = createAsyncThunk(
  'rawMaterials/fetchRawMaterials',
  async () => {
    const response = await rawMaterialsApi.getAll();
    return response.data;
  }
);

export const createRawMaterial = createAsyncThunk(
  'rawMaterials/createRawMaterial',
  async (material) => {
    const response = await rawMaterialsApi.create(material);
    return response.data;
  }
);

export const updateRawMaterial = createAsyncThunk(
  'rawMaterials/updateRawMaterial',
  async ({ id, material }) => {
    const response = await rawMaterialsApi.update(id, material);
    return response.data;
  }
);

export const deleteRawMaterial = createAsyncThunk(
  'rawMaterials/deleteRawMaterial',
  async (id) => {
    await rawMaterialsApi.delete(id);
    return id;
  }
);

const rawMaterialsSlice = createSlice({
  name: 'rawMaterials',
  initialState: {
    items: [],
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
      // Fetch Raw Materials
      .addCase(fetchRawMaterials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRawMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRawMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Raw Material
      .addCase(createRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Raw Material
      .addCase(updateRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Raw Material
      .addCase(deleteRawMaterial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRawMaterial.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteRawMaterial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = rawMaterialsSlice.actions;
export default rawMaterialsSlice.reducer;
