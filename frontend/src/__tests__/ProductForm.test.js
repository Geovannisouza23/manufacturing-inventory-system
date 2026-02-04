import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductForm from '../pages/ProductForm';

const mockStore = configureStore([]);

describe('ProductForm Component', () => {
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

  test('renders product form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductForm />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByLabelText(/Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
  });

  test('allows input in form fields', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductForm />
        </BrowserRouter>
      </Provider>
    );
    
    const codeInput = screen.getByLabelText(/Code/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const priceInput = screen.getByLabelText(/Price/i);

    fireEvent.change(codeInput, { target: { value: 'P001' } });
    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(priceInput, { target: { value: '100' } });

    expect(codeInput.value).toBe('P001');
    expect(nameInput.value).toBe('Test Product');
    expect(priceInput.value).toBe('100');
  });

  test('renders save button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductForm />
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});
