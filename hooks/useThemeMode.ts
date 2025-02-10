import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DEFAULT_THEME = 'dark';

export type Theme = 'dark' | 'light';

/**
 * `useTheme`의 쉽게 사용하기 위한 커스텀 훅
 *
 * 기존 `theme`은 `string`타입에 `dark`, `light`, `system`으로 나뉘어 있습니다.
 *
 * 만약 `system` 테마일 경우 `dark`인지 `light`인지 한 번 더 확인해야 해서 불편합니다.
 *
 * 그래서 해당 훅은 추가적인 작업 없이 `dark`인지 `light`인지 바로 반환해줍니다.
 *
 * 추가적으로 토글 핸들러를 제공해 모드 전환도 간단히 할 수 있습니다.
 *
 * @property theme : 테마. `dark` 혹은 `light`
 * @property toggleTheme : 토글 핸들러. `dark`->`light`, `light`->`dark`로 전환
 */
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
