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
    
    // Use getAllByText for elements that appear multiple times
    const productsLinks = screen.getAllByText('Products');
    expect(productsLinks.length).toBeGreaterThan(0);
    
    const rawMaterialsLinks = screen.getAllByText('Raw Materials');
    expect(rawMaterialsLinks.length).toBeGreaterThan(0);
    
    const productionLinks = screen.getAllByText('Production');
    expect(productionLinks.length).toBeGreaterThan(0);
  });

  test('renders main navigation bar', () => {
    render(<App />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });
});
