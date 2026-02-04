import productsReducer, {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
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

  test('should handle createProduct.fulfilled', () => {
    const newProduct = { id: 3, code: 'P003', name: 'Product 3', price: 300 };
    const stateWithItems = { ...initialState, items: [{ id: 1, code: 'P001', name: 'Product 1', price: 100 }] };
    const actual = productsReducer(stateWithItems, createProduct.fulfilled(newProduct));
    expect(actual.items).toHaveLength(2);
    expect(actual.items[1]).toEqual(newProduct);
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
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].id).toBe(2);
  });
});
