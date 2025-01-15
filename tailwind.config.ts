import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // background: 'hsl(var(--background))',
        background: 'var(--b-primary-light)',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        // border: 'hsl(var(--border))',
        border: 'var(--border-primary)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // 컬러 커스텀
        // Point 컬러
        p: {
          purple: 'var(--point-purple)',
          blue: 'var(--point-blue)',
          cyan: 'var(--point-cyan)',
          pink: 'var(--point-pink)',
          rose: 'var(--point-rose)',
          orange: 'var(--point-orange)',
          yellow: 'var(--point-yellow)',
        },
        // 브랜드 컬러
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          tertiary: 'var(--brand-tertiary)',
          gradient: 'var(--brand-gradient)',
        },
        // 배경색
        b: {
          primary: 'var(--b-primary-light)',
          secondary: 'var(--b-secondary-light)',
          tertiary: 'var(--b-tertiary-light)',
          inverse: 'var(--b-inverse)',
        },
        // 텍스트 색상
        t: {
          primary: 'var(--t-primary-light)',
          secondary: 'var(--t-secondary)',
          tertiary: 'var(--t-tertiary)',
          default: 'var(--t-default)',
          inverse: 'var(--t-inverse)',
          disabled: 'var(--t-disabled)',
        },
        // 상호작용 색상
        i: {
          inactive: 'var(--i-inactive)',
          hover: 'var(--i-hover)',
          pressed: 'var(--i-pressed)',
          focus: 'var(--i-focus)',
        },
        // 기타 상태
        s: {
          danger: 'var(--s-danger)',
        },
        // 아이콘 색상
        icon: {
          primary: 'var(--icon-primary)',
          inverse: 'var(--icon-inverse)',
          brand: 'var(--icon-brand)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
