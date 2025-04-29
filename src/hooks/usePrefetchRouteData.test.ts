
import { renderHook } from '@testing-library/react';
import { usePrefetchRouteData } from './usePrefetchRouteData';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';

// Mock dependencies
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

describe('usePrefetchRouteData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('prefetches featured deals data when on homepage', () => {
    const prefetchQueryMock = vi.fn();
    (useQueryClient as any).mockReturnValue({
      prefetchQuery: prefetchQueryMock
    });
    (useLocation as any).mockReturnValue({ pathname: '/' });

    renderHook(() => usePrefetchRouteData());
    
    // Move forward in time to trigger the setTimeout
    vi.advanceTimersByTime(1000);
    
    expect(prefetchQueryMock).toHaveBeenCalledWith({
      queryKey: ['deals', 'featured'],
      queryFn: expect.any(Function)
    });
  });

  it('prefetches user settings when on dashboard', () => {
    const prefetchQueryMock = vi.fn();
    (useQueryClient as any).mockReturnValue({
      prefetchQuery: prefetchQueryMock
    });
    (useLocation as any).mockReturnValue({ pathname: '/dashboard' });

    renderHook(() => usePrefetchRouteData());
    
    // Move forward in time to trigger the setTimeout
    vi.advanceTimersByTime(1000);
    
    expect(prefetchQueryMock).toHaveBeenCalledWith({
      queryKey: ['user-data', 'settings'],
      queryFn: expect.any(Function)
    });
  });

  it('does not prefetch anything for other routes', () => {
    const prefetchQueryMock = vi.fn();
    (useQueryClient as any).mockReturnValue({
      prefetchQuery: prefetchQueryMock
    });
    (useLocation as any).mockReturnValue({ pathname: '/some-other-page' });

    renderHook(() => usePrefetchRouteData());
    
    // Move forward in time to trigger the setTimeout
    vi.advanceTimersByTime(1000);
    
    expect(prefetchQueryMock).not.toHaveBeenCalled();
  });
});
