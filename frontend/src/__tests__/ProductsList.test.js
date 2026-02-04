import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductsList from '../pages/ProductsList';

const mockStore = configureStore([]);

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
  });

  test('renders products list heading', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsList />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
  });

  test('renders add new product button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsList />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
  });

  test('shows empty state when no products', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsList />
        </BrowserRouter>
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

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsList />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
