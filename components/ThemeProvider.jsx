'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/* Keys used before the theme stopped persisting. Cleared on mount so no orphan
   data is left in anyone's browser; safe to delete once a while has passed. */
const RETIRED_STORAGE_KEYS = ['owasp-cuj-theme', 'owasp-cuj-theme-v2'];

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  mounted: false,
});

export const useTheme = () => useContext(ThemeContext);

/**
 * Dependency-free dark/light theme provider.
 *
 * The site always opens in light mode. The choice deliberately is NOT stored,
 * so every visit starts bright; the toggle applies for as long as the page is
 * open and resets on reload. Because the server also renders light, there is
 * no flash of the wrong theme and no pre-paint script is needed.
 *
 * `color-scheme` is handled in app/globals.css (:root and .dark), so toggling
 * the class is all this has to do.
 */
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      RETIRED_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      /* storage can be blocked (private mode / cookie settings) - ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, mounted]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
