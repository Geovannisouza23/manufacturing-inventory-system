import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RawMaterialsList from '../pages/RawMaterialsList';

const mockStore = configureStore([]);

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RawMaterialsList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rawMaterials: {
        items: [],
        loading: false,
        error: null
      }
    });
    store.dispatch = jest.fn();
    mockNavigate.mockClear();
  });

  test('renders raw materials list heading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByRole('heading', { name: /Raw Materials/i })).toBeInTheDocument();
  });

  test('shows empty state when no materials', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/No raw materials found.*Add New Material/i)).toBeInTheDocument();
  });

  test('renders materials when available', () => {
    store = mockStore({
      rawMaterials: {
        items: [
          { id: 1, code: 'RM001', name: 'Material 1', stockQuantity: 100 },
          { id: 2, code: 'RM002', name: 'Material 2', stockQuantity: 200 }
        ],
        loading: false,
        error: null
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText('Material 1')).toBeInTheDocument();
    expect(screen.getByText('Material 2')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    store = mockStore({
      rawMaterials: {
        items: [],
        loading: true,
        error: null
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Loading raw materials/i)).toBeInTheDocument();
  });

  test('shows error state', () => {
    store = mockStore({
      rawMaterials: {
        items: [],
        loading: false,
        error: 'Failed to fetch materials'
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialsList />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Error: Failed to fetch materials/i)).toBeInTheDocument();
  });

  test('navigates to new material form when add button clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialsList />
        </MemoryRouter>
      </Provider>
    );
    
    const addButton = screen.getByRole('button', { name: /Add New Material/i });
    fireEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith('/raw-materials/new');
  });
});
