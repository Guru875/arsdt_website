'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import themeData from '@/data/theme.json';
import palettesData from '@/data/palettes.json';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [palette, setPaletteState] = useState('green');

  useEffect(() => {
    const savedTheme = localStorage.getItem('arsdt-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeState(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }

    const savedPalette = localStorage.getItem('arsdt-palette');
    if (savedPalette && palettesData[savedPalette]) {
      setPaletteState(savedPalette);
    }
  }, []);

  useEffect(() => {
    const colors = { ...themeData[theme] };
    
    // Override colors with selected palette colors
    const paletteConfig = palettesData[palette];
    if (paletteConfig && paletteConfig[theme]) {
      Object.assign(colors, paletteConfig[theme]);
    }

    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
  }, [theme, palette]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('arsdt-theme', next);
      return next;
    });
  }, []);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    localStorage.setItem('arsdt-theme', t);
  }, []);

  const setPalette = useCallback((p) => {
    if (palettesData[p]) {
      setPaletteState(p);
      localStorage.setItem('arsdt-palette', p);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      setTheme,
      isDark: theme === 'dark',
      palette,
      setPalette,
      palettes: Object.entries(palettesData).map(([key, val]) => ({
        id: key,
        name: val.name,
        color: val.color
      }))
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

