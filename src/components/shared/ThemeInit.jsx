import { useEffect } from 'react';

/**
 * Applies theme (dark/light) from localStorage or system preference on app load.
 * Ensures theme is set before any page renders (including Login).
 */
const ThemeInit = () => {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        document.documentElement.classList.toggle('dark', saved === 'dark');
      } else {
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    } catch (_) {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return null;
};

export default ThemeInit;
