import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home Component', () => {
  test('renders welcome message', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });

  test('renders action cards', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    const buttons = screen.getAllByRole('link');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
