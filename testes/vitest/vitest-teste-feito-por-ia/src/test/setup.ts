import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';
import { stubMatchMedia } from './utils';

beforeEach(() => {
  // jsdom ships no `matchMedia`, and `ThemeToggle` calls it on first render.
  stubMatchMedia(false);
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  cleanup();
});
