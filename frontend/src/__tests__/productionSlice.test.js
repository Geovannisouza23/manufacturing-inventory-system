import productionReducer, {
  calculateProduction,
  clearError,
} from '../store/slices/productionSlice';

describe('productionSlice', () => {
  const initialState = {
    report: null,
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(productionReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('clearError action should clear error', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const actual = productionReducer(stateWithError, clearError());
    expect(actual.error).toBe(null);
  });

  describe('calculateProduction', () => {
    test('should handle calculateProduction.pending', () => {
      const actual = productionReducer(initialState, calculateProduction.pending());
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    test('should handle calculateProduction.fulfilled', () => {
      const report = {
        totalProducts: 10,
        productsWithMaterials: 8,
        productsWithoutMaterials: 2,
        products: [
          {
            id: 1,
            code: 'P001',
            name: 'Product 1',
            canProduce: true,
            maxQuantity: 50,
            materials: []
          }
        ]
      };
      const actual = productionReducer(initialState, calculateProduction.fulfilled(report));
      expect(actual.loading).toBe(false);
      expect(actual.report).toEqual(report);
      expect(actual.report.totalProducts).toBe(10);
    });

    test('should handle calculateProduction.rejected', () => {
      const action = { 
        type: calculateProduction.rejected.type, 
        error: { message: 'Calculation failed' } 
      };
      const actual = productionReducer(initialState, action);
      expect(actual.loading).toBe(false);
      expect(actual.error).toBe('Calculation failed');
      expect(actual.report).toBe(null);
    });

    test('should replace existing report on new calculation', () => {
      const oldReport = {
        totalProducts: 5,
        productsWithMaterials: 3,
        productsWithoutMaterials: 2,
        products: []
      };
      const stateWithReport = { ...initialState, report: oldReport };
      
      const newReport = {
        totalProducts: 10,
        productsWithMaterials: 8,
        productsWithoutMaterials: 2,
        products: []
      };
      const actual = productionReducer(stateWithReport, calculateProduction.fulfilled(newReport));
      expect(actual.report).toEqual(newReport);
      expect(actual.report.totalProducts).toBe(10);
    });
  });
});
