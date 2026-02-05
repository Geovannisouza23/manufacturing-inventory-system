import { createSelector } from '@reduxjs/toolkit';

// Products selectors
export const selectProductsState = (state) => state.products || { items: [], loading: false, error: null };

export const selectProductsItems = createSelector(
  [selectProductsState],
  (productsState) => productsState.items || []
);

export const selectProductsLoading = createSelector(
  [selectProductsState],
  (productsState) => productsState.loading || false
);

export const selectProductsError = createSelector(
  [selectProductsState],
  (productsState) => productsState.error || null
);

// Raw Materials selectors
export const selectRawMaterialsState = (state) => state.rawMaterials || { items: [], loading: false, error: null };

export const selectRawMaterialsItems = createSelector(
  [selectRawMaterialsState],
  (rawMaterialsState) => rawMaterialsState.items || []
);

export const selectRawMaterialsLoading = createSelector(
  [selectRawMaterialsState],
  (rawMaterialsState) => rawMaterialsState.loading || false
);

export const selectRawMaterialsError = createSelector(
  [selectRawMaterialsState],
  (rawMaterialsState) => rawMaterialsState.error || null
);

// Production selectors
export const selectProductionState = (state) => state.production || { report: null, loading: false, error: null };

export const selectProductionReport = createSelector(
  [selectProductionState],
  (productionState) => productionState.report || null
);

export const selectProductionLoading = createSelector(
  [selectProductionState],
  (productionState) => productionState.loading || false
);

export const selectProductionError = createSelector(
  [selectProductionState],
  (productionState) => productionState.error || null
);
