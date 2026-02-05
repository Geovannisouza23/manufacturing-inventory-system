import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductsList from '../pages/ProductsList';

const mockStore = configureStore([]);

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ProductsList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        items: [],
        loading: false,
        error: null
      }
    });
    store.dispatch = jest.fn();
    mockNavigate.mockClear();
  });

  test('renders products list heading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByRole('heading', { name: /Products/i })).toBeInTheDocument();
  });

  test('renders add new product button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByRole('button', { name: /Add New Product/i })).toBeInTheDocument();
  });

  test('shows empty state when no products', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });

  test('renders products when available', () => {
    store = mockStore({
      products: {
        items: [
          { id: 1, code: 'P001', name: 'Product 1', price: 100 },
          { id: 2, code: 'P002', name: 'Product 2', price: 200 }
        ],
        loading: false,
        error: null
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    store = mockStore({
      products: {
        items: [],
        loading: true,
        error: null
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Loading products/i)).toBeInTheDocument();
  });

  test('shows error state', () => {
    store = mockStore({
      products: {
        items: [],
        loading: false,
        error: 'Failed to fetch products'
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Error: Failed to fetch products/i)).toBeInTheDocument();
  });

  test('navigates to new product form when add button clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    const addButton = screen.getByRole('button', { name: /Add New Product/i });
    fireEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith('/products/new');
  });

  test('handles delete confirmation', () => {
    store = mockStore({
      products: {
        items: [
          { id: 1, code: 'P001', name: 'Product 1', price: 100 }
        ],
        loading: false,
        error: null
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductsList />
        </MemoryRouter>
      </Provider>
    );
    
    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]);
    expect(screen.getByText(/Confirm\?/i)).toBeInTheDocument();
  });
});
