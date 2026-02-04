import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import RawMaterialForm from '../pages/RawMaterialForm';

const mockStore = configureStore([]);

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
  useParams: () => ({}),
}));

describe('RawMaterialForm Component', () => {
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
    mockedNavigate.mockClear();
  });

  test('renders raw material form with all fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialForm />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Raw Material Form/i)).toBeInTheDocument();
  });

  test('form has input fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialForm />
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
          <RawMaterialForm />
        </MemoryRouter>
      </Provider>
    );
    
    const codeInput = screen.getByPlaceholderText(/Enter raw material code/i);
    fireEvent.change(codeInput, { target: { value: 'RM001' } });
    expect(codeInput.value).toBe('RM001');
  });

  test('shows save button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialForm />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Save Raw Material/i)).toBeInTheDocument();
  });

  test('shows cancel button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialForm />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('navigates back when cancel is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RawMaterialForm />
        </MemoryRouter>
      </Provider>
    );
    
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/raw-materials');
  });
});
