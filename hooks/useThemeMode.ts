import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DEFAULT_THEME = 'dark';

export type Theme = 'dark' | 'light';

export default function useThemeMode() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);
  const { theme, systemTheme, setTheme } = useTheme();

  const toggle = (theme: Theme) => (theme === 'dark' ? 'light' : 'dark');

  const toggleTheme = () => {
    if (theme === 'system' && systemTheme) {
      setTheme(toggle(systemTheme));
      return;
    }
    if (theme === 'dark' || theme === 'light') {
      setTheme((prev) => toggle(prev as Theme));
      return;
    }
    setTheme(toggle(DEFAULT_THEME));
  };

  useEffect(() => {
    if (theme === 'system') {
      const next = systemTheme || DEFAULT_THEME;
      setCurrentTheme(next);
      return;
    }

    if (theme === 'dark' || theme === 'light') {
      setCurrentTheme(theme);
      return;
    }

    setCurrentTheme(DEFAULT_THEME);
  }, [theme, systemTheme]);

  return { theme: currentTheme, toggleTheme };
}
