
import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthCallbackLoader from './AuthCallbackLoader';
import { describe, it, expect } from 'vitest';

describe('AuthCallbackLoader Component', () => {
  it('renders loading indicator', () => {
    render(<AuthCallbackLoader retryCount={0} maxRetries={3} />);
    expect(screen.getByText('Completing authentication...')).toBeInTheDocument();
  });

  it('does not show retry count when retryCount is 0', () => {
    render(<AuthCallbackLoader retryCount={0} maxRetries={3} />);
    expect(screen.queryByText(/Retry attempt/)).not.toBeInTheDocument();
  });

  it('shows retry count when retryCount is greater than 0', () => {
    render(<AuthCallbackLoader retryCount={2} maxRetries={3} />);
    expect(screen.getByText('Retry attempt 2/3')).toBeInTheDocument();
  });
});
