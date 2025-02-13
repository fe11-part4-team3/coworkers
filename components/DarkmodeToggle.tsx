import { Moon, Sun } from 'lucide-react';

import useThemeMode from '@/hooks/useThemeMode';

function DarkmodeToggle() {
  const { theme, toggleTheme } = useThemeMode();

  // 다크 모드 여부 확인
  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => toggleTheme()}
      className="light:bg-i-inactive flex items-center rounded-full p-pr-8 transition-all duration-300 hover:bg-b-tertiary"
      aria-label="Dark mode toggle"
    >
      {isDark ? (
        <Moon className="size-pr-20" />
      ) : (
        <Sun className="size-pr-20" />
      )}
    </button>
  );
}

export default DarkmodeToggle;
