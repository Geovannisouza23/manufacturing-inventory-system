import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Inventory Management System')).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Raw Materials')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
  });
});
