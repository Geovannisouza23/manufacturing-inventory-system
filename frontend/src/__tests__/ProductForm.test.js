import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductForm from '../pages/ProductForm';

const mockStore = configureStore([]);

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: () => ({}),
}));

describe('ProductForm Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        items: [],
        loading: false,
        error: null
      },
      rawMaterials: {
        items: [],
        loading: false,
        error: null
      }
    });
    store.dispatch = jest.fn();
    mockedNavigate.mockClear();
  });

  test('renders product form with all fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByRole('heading', { name: /New Product/i })).toBeInTheDocument();
  });

  test('form has input fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  test('handles form input changes', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );
    
    const codeInput = screen.getByLabelText(/Code/i);
    fireEvent.change(codeInput, { target: { value: 'P001' } });
    expect(codeInput.value).toBe('P001');
  });

  test('shows save button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Save Product/i)).toBeInTheDocument();
  });

  test('shows cancel button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('navigates back when cancel is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );
    
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/products');
  });
});
