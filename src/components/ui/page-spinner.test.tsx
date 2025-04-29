
import { render, screen } from '@testing-library/react';
import { PageSpinner } from './page-spinner';
import { describe, it, expect } from 'vitest';

describe('PageSpinner Component', () => {
  it('renders correctly', () => {
    render(<PageSpinner />);
    
    // Since the PageSpinner uses Skeleton components which don't have specific text,
    // we can verify it renders by checking for its container
    const spinnerContainer = document.querySelector('.min-h-screen');
    expect(spinnerContainer).toBeInTheDocument();
  });
  
  it('renders all skeleton elements', () => {
    render(<PageSpinner />);
    
    // Verify all skeleton elements are rendered
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
    
    // Verify the grid layout
    const grid = document.querySelector('.grid-cols-3');
    expect(grid).toBeInTheDocument();
  });
});
