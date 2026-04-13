import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTheme, setTheme as saveTheme } from '../utils/storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => getTheme());

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      saveTheme(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    saveTheme(t);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
