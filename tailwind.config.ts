import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

import { customConfig } from './tailwind-pxr.config';

const shadcnConfig: Config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './globals.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Arial', 'sans-serif'],
      },
      colors: {
        background: 'var(--b-primary-light)',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'var(--b-secondary-dark)',
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
          DEFAULT: 'var(--b-tertiary-dark)',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        border: 'var(--border)',
        p: {
          purple: 'var(--point-purple)',
          blue: 'var(--point-blue)',
          cyan: 'var(--point-cyan)',
          pink: 'var(--point-pink)',
          rose: 'var(--point-rose)',
          orange: 'var(--point-orange)',
          yellow: 'var(--point-yellow)',
        },
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          tertiary: 'var(--brand-tertiary)',
        },
        b: {
          primary: 'var(--b-primary-light)',
          secondary: 'var(--b-secondary-light)',
          'secondary-2': 'var(--b-secondary-2-light)',
          tertiary: 'var(--b-tertiary-light)',
          inverse: 'var(--b-inverse)',
        },
        t: {
          primary: 'var(--t-primary-light)',
          secondary: 'var(--t-secondary)',
          tertiary: 'var(--t-tertiary)',
          default: 'var(--t-default)',
          inverse: 'var(--t-inverse)',
          disabled: 'var(--t-disabled)',
        },
        i: {
          inactive: 'var(--i-inactive)',
          hover: 'var(--i-hover)',
          pressed: 'var(--i-pressed)',
          focus: 'var(--i-focus)',
        },
        s: {
          danger: 'var(--s-danger)',
        },
        icon: {
          primary: 'var(--icon-primary)',
          inverse: 'var(--icon-inverse)',
          brand: 'var(--icon-brand)',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontSize: {
        '12': [
          '0.75rem',
          {
            lineHeight: '0.875rem',
            fontWeight: '400',
          },
        ],
        '13': [
          '0.8125rem',
          {
            lineHeight: '1rem',
            fontWeight: '400',
          },
        ],
        '14': [
          '0.875rem',
          {
            lineHeight: '1.0625rem',
            fontWeight: '400',
          },
        ],
        '16': [
          '1rem',
          {
            lineHeight: '1.1875rem',
            fontWeight: '400',
          },
        ],
        '18': [
          '1.125rem',
          {
            lineHeight: '1.3125rem',
            fontWeight: '400',
          },
        ],
        '20': [
          '1.25rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '400',
          },
        ],
        '24': [
          '1.5rem',
          {
            lineHeight: '1.75rem',
            fontWeight: '400',
          },
        ],
        '12m': [
          '0.75rem',
          {
            lineHeight: '0.875rem',
            fontWeight: '500',
          },
        ],
        '12sb': [
          '0.75rem',
          {
            lineHeight: '0.875rem',
            fontWeight: '600',
          },
        ],
        '13m': [
          '0.8125rem',
          {
            lineHeight: '1rem',
            fontWeight: '500',
          },
        ],
        '13sb': [
          '0.8125rem',
          {
            lineHeight: '1rem',
            fontWeight: '600',
          },
        ],
        '14m': [
          '0.875rem',
          {
            lineHeight: '1.0625rem',
            fontWeight: '500',
          },
        ],
        '14sb': [
          '0.875rem',
          {
            lineHeight: '1.0625rem',
            fontWeight: '600',
          },
        ],
        '14b': [
          '0.875rem',
          {
            lineHeight: '1.0625rem',
            fontWeight: '700',
          },
        ],
        '16m': [
          '1rem',
          {
            lineHeight: '1.1875rem',
            fontWeight: '500',
          },
        ],
        '16sb': [
          '1rem',
          {
            lineHeight: '1.1875rem',
            fontWeight: '600',
          },
        ],
        '16b': [
          '1rem',
          {
            lineHeight: '1.1875rem',
            fontWeight: '700',
          },
        ],
        '18m': [
          '1.125rem',
          {
            lineHeight: '1.3125rem',
            fontWeight: '500',
          },
        ],
        '18sb': [
          '1.125rem',
          {
            lineHeight: '1.3125rem',
            fontWeight: '600',
          },
        ],
        '18b': [
          '1.125rem',
          {
            lineHeight: '1.3125rem',
            fontWeight: '700',
          },
        ],
        '20m': [
          '1.25rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '500',
          },
        ],
        '20sb': [
          '1.25rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '600',
          },
        ],
        '20b': [
          '1.25rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '700',
          },
        ],
        '24m': [
          '1.5rem',
          {
            lineHeight: '1.75rem',
            fontWeight: '500',
          },
        ],
        '24sb': [
          '1.5rem',
          {
            lineHeight: '1.75rem',
            fontWeight: '600',
          },
        ],
        '24b': [
          '1.5rem',
          {
            lineHeight: '1.75rem',
            fontWeight: '700',
          },
        ],
        '32sb': [
          '2rem',
          {
            lineHeight: '2.375rem',
            fontWeight: '600',
          },
        ],
        '32b': [
          '2rem',
          {
            lineHeight: '2.375rem',
            fontWeight: '700',
          },
        ],
        '40m': [
          '2.5rem',
          {
            lineHeight: '3rem',
            fontWeight: '500',
          },
        ],
      },
      screens: {
        team_xmo: {
          max: '550px',
        },
        team_mo: {
          min: '550px',
          max: '767px',
        },
        mo: {
          max: '767px',
        },
        ta: {
          min: '768px',
          max: '1279px',
        },
        tamo: {
          max: '1279px',
        },
      },
    },
    theme: {
      remDivider: 16,
      fontSizeLimit: 100,
      spacingLimit: 2000,
      borderRadiusLimit: 100,
    },
  },
};
export default {
  ...shadcnConfig,
  theme: {
    extend: {
      ...shadcnConfig.theme?.extend,
      ...customConfig.theme?.extend,
    },
    plugins: {
      ...shadcnConfig.theme?.plugins,
      ...customConfig.theme?.plugins,
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
