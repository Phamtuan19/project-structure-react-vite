import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
   writable: true,
   value: (query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
   }),
});

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
   observe() {}
   unobserve() {}
   disconnect() {}
}

globalThis.ResizeObserver = MockResizeObserver;

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
   readonly root: Element | null = null;
   readonly rootMargin = '';
   readonly thresholds: ReadonlyArray<number> = [];

   observe() {}
   unobserve() {}
   disconnect() {}
   takeRecords(): IntersectionObserverEntry[] {
      return [];
   }
}

globalThis.IntersectionObserver = MockIntersectionObserver;
