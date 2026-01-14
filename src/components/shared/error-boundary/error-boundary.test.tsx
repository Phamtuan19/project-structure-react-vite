import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './index';

// Component that throws an error
const ErrorComponent = () => {
   throw new Error('Test error');
};

// Normal component
const NormalComponent = () => <div>Normal component</div>;

describe('ErrorBoundary', () => {
   beforeEach(() => {
      // Clear all mocks
      vi.clearAllMocks();
   });

   it('renders children when there is no error', () => {
      render(
         <ErrorBoundary>
            <NormalComponent />
         </ErrorBoundary>,
      );

      expect(screen.getByText('Normal component')).toBeInTheDocument();
   });

   it('renders error UI when there is an error', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
         <ErrorBoundary>
            <ErrorComponent />
         </ErrorBoundary>,
      );

      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/something unexpected happened/i)).toBeInTheDocument();

      consoleSpy.mockRestore();
   });

   it('allows retry when error occurs', async () => {
      const user = userEvent.setup();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
         <ErrorBoundary>
            <ErrorComponent />
         </ErrorBoundary>,
      );

      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

      // Click retry button should exist and be clickable
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
      await user.click(retryButton);

      // After clicking retry, the error UI should still be visible
      // (since ErrorBoundary doesn't actually retry the failed component)
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();

      consoleSpy.mockRestore();
   });

   it('shows error details in development mode', () => {
      const originalEnv = import.meta.env.DEV;

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
         <ErrorBoundary>
            <ErrorComponent />
         </ErrorBoundary>,
      );

      expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();

      // Restore original env
      import.meta.env.DEV = originalEnv;
      consoleSpy.mockRestore();
   });
});
