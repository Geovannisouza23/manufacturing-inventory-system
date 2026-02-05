import rawMaterialsReducer, {
  fetchRawMaterials,
  createRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
  clearError,
} from '../store/slices/rawMaterialsSlice';

describe('rawMaterialsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(rawMaterialsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('clearError action should clear error', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const actual = rawMaterialsReducer(stateWithError, clearError());
    expect(actual.error).toBe(null);
  });

  describe('fetchRawMaterials', () => {
    test('should handle fetchRawMaterials.pending', () => {
      const actual = rawMaterialsReducer(initialState, fetchRawMaterials.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle fetchRawMaterials.fulfilled', () => {
      const materials = [
        { id: 1, code: 'RM001', name: 'Material 1', stockQuantity: 100 },
        { id: 2, code: 'RM002', name: 'Material 2', stockQuantity: 200 },
      ];
      const actual = rawMaterialsReducer(initialState, fetchRawMaterials.fulfilled(materials));
      expect(actual.loading).toBe(false);
      expect(actual.items).toEqual(materials);
    });

    test('should handle fetchRawMaterials.rejected', () => {
      const action = { 
        type: fetchRawMaterials.rejected.type, 
        error: { message: 'Network error' } 
      };
      const actual = rawMaterialsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Network error');
    });
  });

  describe('createRawMaterial', () => {
    test('should handle createRawMaterial.pending', () => {
      const actual = rawMaterialsReducer(initialState, createRawMaterial.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle createRawMaterial.fulfilled', () => {
      const newMaterial = { id: 3, code: 'RM003', name: 'Material 3', stockQuantity: 300 };
      const stateWithItems = { ...initialState, items: [{ id: 1, code: 'RM001', name: 'Material 1', stockQuantity: 100 }] };
      const actual = rawMaterialsReducer(stateWithItems, createRawMaterial.fulfilled(newMaterial));
      expect(actual.loading).toBe(false);
      expect(actual.items).toHaveLength(2);
      expect(actual.items[1]).toEqual(newMaterial);
    });

    test('should handle createRawMaterial.rejected', () => {
      const action = { 
        type: createRawMaterial.rejected.type, 
        error: { message: 'Creation failed' } 
      };
      const actual = rawMaterialsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Creation failed');
    });
  });

  describe('updateRawMaterial', () => {
    test('should handle updateRawMaterial.pending', () => {
      const actual = rawMaterialsReducer(initialState, updateRawMaterial.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle updateRawMaterial.fulfilled', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { id: 1, code: 'RM001', name: 'Material 1', stockQuantity: 100 },
          { id: 2, code: 'RM002', name: 'Material 2', stockQuantity: 200 },
        ],
      };
      const updatedMaterial = { id: 1, code: 'RM001', name: 'Updated Material', stockQuantity: 150 };
      const actual = rawMaterialsReducer(stateWithItems, updateRawMaterial.fulfilled(updatedMaterial));
      expect(actual.loading).toBe(false);
      expect(actual.items[0]).toEqual(updatedMaterial);
      expect(actual.items[1].id).toBe(2);
    });

    test('should handle updateRawMaterial.fulfilled with non-existent id', () => {
      const stateWithItems = {
        ...initialState,
        items: [{ id: 1, code: 'RM001', name: 'Material 1', stockQuantity: 100 }],
      };
      const updatedMaterial = { id: 999, code: 'RM999', name: 'Non-existent', stockQuantity: 150 };
      const actual = rawMaterialsReducer(stateWithItems, updateRawMaterial.fulfilled(updatedMaterial));
      expect(actual.items[0].id).toBe(1);
      expect(actual.items).toHaveLength(1);
    });

    test('should handle updateRawMaterial.rejected', () => {
      const action = { 
        type: updateRawMaterial.rejected.type, 
        error: { message: 'Update failed' } 
      };
      const actual = rawMaterialsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Update failed');
    });
  });

  describe('deleteRawMaterial', () => {
    test('should handle deleteRawMaterial.pending', () => {
      const actual = rawMaterialsReducer(initialState, deleteRawMaterial.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle deleteRawMaterial.fulfilled', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { id: 1, code: 'RM001', name: 'Material 1', stockQuantity: 100 },
          { id: 2, code: 'RM002', name: 'Material 2', stockQuantity: 200 },
        ],
      };
      const actual = rawMaterialsReducer(stateWithItems, deleteRawMaterial.fulfilled(1));
      expect(actual.loading).toBe(false);
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0].id).toBe(2);
    });

    test('should handle deleteRawMaterial.rejected', () => {
      const action = { 
        type: deleteRawMaterial.rejected.type, 
        error: { message: 'Delete failed' } 
      };
      const actual = rawMaterialsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Delete failed');
    });
  });
});
