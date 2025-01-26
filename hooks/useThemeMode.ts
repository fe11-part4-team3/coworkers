import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DEFAULT_THEME = 'dark';

export type Theme = 'dark' | 'light';

export default function useThemeMode(selectTheme: Theme | undefined): Theme {
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    if (selectTheme) {
      setCurrentTheme(selectTheme);
      return;
    }

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
  }, [theme, systemTheme, selectTheme]);

  return currentTheme;
}
