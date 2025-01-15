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
      fontFamily: {
        sans: ['Pretendard', 'Arial', 'sans-serif'],
      },
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
      fontSize: {
        12: [
          '12px',
          { lineHeight: '14px', fontWeight: '400' },
        ],
        '12m': [
          '12px',
          { lineHeight: '14px', fontWeight: '500' },
        ],
        '12sb': [
          '12px',
          { lineHeight: '14px', fontWeight: '600' },
        ],
        13: [
          '13px',
          { lineHeight: '16px', fontWeight: '400' },
        ],
        '13m': [
          '13px',
          { lineHeight: '16px', fontWeight: '500' },
        ],
        '13sb': [
          '13px',
          { lineHeight: '16px', fontWeight: '600' },
        ],
        14: [
          '14px',
          { lineHeight: '17px', fontWeight: '400' },
        ],
        '14m': [
          '14px',
          { lineHeight: '17px', fontWeight: '500' },
        ],
        '14sb': [
          '14px',
          { lineHeight: '17px', fontWeight: '600' },
        ],
        '14b': [
          '14px',
          { lineHeight: '17px', fontWeight: '700' },
        ],
        16: [
          '16px',
          { lineHeight: '19px', fontWeight: '400' },
        ],
        '16m': [
          '16px',
          { lineHeight: '19px', fontWeight: '500' },
        ],
        '16sb': [
          '16px',
          { lineHeight: '19px', fontWeight: '600' },
        ],
        '16b': [
          '16px',
          { lineHeight: '19px', fontWeight: '700' },
        ],
        18: [
          '18px',
          { lineHeight: '21px', fontWeight: '400' },
        ],
        '18m': [
          '18px',
          { lineHeight: '21px', fontWeight: '500' },
        ],
        '18sb': [
          '18px',
          { lineHeight: '21px', fontWeight: '600' },
        ],
        '18b': [
          '18px',
          { lineHeight: '21px', fontWeight: '700' },
        ],
        20: [
          '20px',
          { lineHeight: '24px', fontWeight: '400' },
        ],
        '20m': [
          '20px',
          { lineHeight: '24px', fontWeight: '500' },
        ],
        '20sb': [
          '20px',
          { lineHeight: '24px', fontWeight: '600' },
        ],
        '20b': [
          '20px',
          { lineHeight: '24px', fontWeight: '700' },
        ],
        24: [
          '24px',
          { lineHeight: '28px', fontWeight: '400' },
        ],
        '24m': [
          '24px',
          { lineHeight: '28px', fontWeight: '500' },
        ],
        '24sb': [
          '24px',
          { lineHeight: '28px', fontWeight: '600' },
        ],
        '24b': [
          '24px',
          { lineHeight: '28px', fontWeight: '700' },
        ],
        '32sb': [
          '32px',
          { lineHeight: '38px', fontWeight: '600' },
        ],
        '32b': [
          '32px',
          { lineHeight: '38px', fontWeight: '700' },
        ],
        '40m': [
          '40px',
          { lineHeight: '48px', fontWeight: '500' },
        ],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
