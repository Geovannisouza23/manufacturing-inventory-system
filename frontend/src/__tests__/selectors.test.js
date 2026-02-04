import {
  selectProductsItems,
  selectProductsLoading,
  selectProductsError,
  selectRawMaterialsItems,
  selectRawMaterialsLoading,
  selectRawMaterialsError,
  selectProductionReport,
  selectProductionLoading,
  selectProductionError,
} from '../store/selectors';

describe('Redux Selectors', () => {
  describe('Products Selectors', () => {
    test('selectProductsItems returns items array', () => {
      const state = {
        products: {
          items: [{ id: 1, name: 'Product 1' }],
          loading: false,
          error: null
        }
      };
      expect(selectProductsItems(state)).toEqual([{ id: 1, name: 'Product 1' }]);
    });

    test('selectProductsItems returns empty array when state is undefined', () => {
      const state = {};
      expect(selectProductsItems(state)).toEqual([]);
    });

    test('selectProductsLoading returns loading state', () => {
      const state = {
        products: {
          items: [],
          loading: true,
          error: null
        }
      };
      expect(selectProductsLoading(state)).toBe(true);
    });

    test('selectProductsError returns error message', () => {
      const state = {
        products: {
          items: [],
          loading: false,
          error: 'Failed to fetch'
        }
      };
      expect(selectProductsError(state)).toBe('Failed to fetch');
    });
  });

  describe('Raw Materials Selectors', () => {
    test('selectRawMaterialsItems returns items array', () => {
      const state = {
        rawMaterials: {
          items: [{ id: 1, name: 'Material 1' }],
          loading: false,
          error: null
        }
      };
      expect(selectRawMaterialsItems(state)).toEqual([{ id: 1, name: 'Material 1' }]);
    });

    test('selectRawMaterialsItems returns empty array when state is undefined', () => {
      const state = {};
      expect(selectRawMaterialsItems(state)).toEqual([]);
    });

    test('selectRawMaterialsLoading returns loading state', () => {
      const state = {
        rawMaterials: {
          items: [],
          loading: true,
          error: null
        }
      };
      expect(selectRawMaterialsLoading(state)).toBe(true);
    });

    test('selectRawMaterialsError returns error message', () => {
      const state = {
        rawMaterials: {
          items: [],
          loading: false,
          error: 'Failed to fetch'
        }
      };
      expect(selectRawMaterialsError(state)).toBe('Failed to fetch');
    });
  });

  describe('Production Selectors', () => {
    test('selectProductionReport returns report', () => {
      const report = { totalProducts: 10 };
      const state = {
        production: {
          report,
          loading: false,
          error: null
        }
      };
      expect(selectProductionReport(state)).toEqual(report);
    });

    test('selectProductionReport returns null when state is undefined', () => {
      const state = {};
      expect(selectProductionReport(state)).toBeNull();
    });

    test('selectProductionLoading returns loading state', () => {
      const state = {
        production: {
          report: null,
          loading: true,
          error: null
        }
      };
      expect(selectProductionLoading(state)).toBe(true);
    });

    test('selectProductionError returns error message', () => {
      const state = {
        production: {
          report: null,
          loading: false,
          error: 'Failed to generate report'
        }
      };
      expect(selectProductionError(state)).toBe('Failed to generate report');
    });
  });
});
