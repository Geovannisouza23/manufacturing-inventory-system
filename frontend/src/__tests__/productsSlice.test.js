import productsReducer, {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  clearError,
} from '../store/slices/productsSlice';

describe('productsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('clearError action should clear error', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const actual = productsReducer(stateWithError, clearError());
    expect(actual.error).toBe(null);
  });

  describe('fetchProducts', () => {
    test('should handle fetchProducts.pending', () => {
      const actual = productsReducer(initialState, fetchProducts.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle fetchProducts.fulfilled', () => {
      const products = [
        { id: 1, code: 'P001', name: 'Product 1', price: 100 },
        { id: 2, code: 'P002', name: 'Product 2', price: 200 },
      ];
      const actual = productsReducer(initialState, fetchProducts.fulfilled(products));
      expect(actual.loading).toBe(false);
      expect(actual.items).toEqual(products);
    });

    test('should handle fetchProducts.rejected', () => {
      const action = { 
        type: fetchProducts.rejected.type, 
        error: { message: 'Network error' } 
      };
      const actual = productsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Network error');
    });
  });

  describe('createProduct', () => {
    test('should handle createProduct.pending', () => {
      const actual = productsReducer(initialState, createProduct.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle createProduct.fulfilled', () => {
      const newProduct = { id: 3, code: 'P003', name: 'Product 3', price: 300 };
      const stateWithItems = { ...initialState, items: [{ id: 1, code: 'P001', name: 'Product 1', price: 100 }] };
      const actual = productsReducer(stateWithItems, createProduct.fulfilled(newProduct));
      expect(actual.loading).toBe(false);
      expect(actual.items).toHaveLength(2);
      expect(actual.items[1]).toEqual(newProduct);
    });

    test('should handle createProduct.rejected', () => {
      const action = { 
        type: createProduct.rejected.type, 
        error: { message: 'Creation failed' } 
      };
      const actual = productsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Creation failed');
    });
  });

  describe('updateProduct', () => {
    test('should handle updateProduct.pending', () => {
      const actual = productsReducer(initialState, updateProduct.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle updateProduct.fulfilled', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { id: 1, code: 'P001', name: 'Product 1', price: 100 },
          { id: 2, code: 'P002', name: 'Product 2', price: 200 },
        ],
      };
      const updatedProduct = { id: 1, code: 'P001', name: 'Updated Product', price: 150 };
      const actual = productsReducer(stateWithItems, updateProduct.fulfilled(updatedProduct));
      expect(actual.loading).toBe(false);
      expect(actual.items[0]).toEqual(updatedProduct);
      expect(actual.items[1].id).toBe(2);
    });

    test('should handle updateProduct.fulfilled with non-existent id', () => {
      const stateWithItems = {
        ...initialState,
        items: [{ id: 1, code: 'P001', name: 'Product 1', price: 100 }],
      };
      const updatedProduct = { id: 999, code: 'P999', name: 'Non-existent', price: 150 };
      const actual = productsReducer(stateWithItems, updateProduct.fulfilled(updatedProduct));
      expect(actual.items[0].id).toBe(1);
      expect(actual.items).toHaveLength(1);
    });

    test('should handle updateProduct.rejected', () => {
      const action = { 
        type: updateProduct.rejected.type, 
        error: { message: 'Update failed' } 
      };
      const actual = productsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Update failed');
    });
  });

  describe('deleteProduct', () => {
    test('should handle deleteProduct.pending', () => {
      const actual = productsReducer(initialState, deleteProduct.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle deleteProduct.fulfilled', () => {
      const stateWithItems = {
        ...initialState,
        items: [
          { id: 1, code: 'P001', name: 'Product 1', price: 100 },
          { id: 2, code: 'P002', name: 'Product 2', price: 200 },
        ],
      };
      const actual = productsReducer(stateWithItems, deleteProduct.fulfilled(1));
      expect(actual.loading).toBe(false);
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0].id).toBe(2);
    });

    test('should handle deleteProduct.rejected', () => {
      const action = { 
        type: deleteProduct.rejected.type, 
        error: { message: 'Delete failed' } 
      };
      const actual = productsReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Delete failed');
    });
  });
});
