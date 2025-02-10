import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

function DarkmodeToggle() {
  const { theme, setTheme } = useTheme();

  // 다크 모드 여부 확인
  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="light:bg-i-inactive flex items-center rounded-full p-pr-8 transition-all duration-300 hover:bg-b-tertiary"
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
