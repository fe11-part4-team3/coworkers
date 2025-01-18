import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const plugin = require('tailwindcss/plugin');

// 공통 유틸리티 생성 함수
interface GenerateSizesOptions {
  limit: number;
  divider: number;
  prefix: string;
}

const generateSizes = ({
  limit,
  divider,
  prefix,
}: GenerateSizesOptions): Record<string, string> => {
  const sizes: Record<string, string> = {};
  for (let i = 0; i <= limit; i++) {
    sizes[`${prefix}-${i}`] = `${i / divider}rem`;
  }
  return sizes;
};

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Arial', 'sans-serif'],
      },
      colors: {
        // REVIEW : shadcn option
        // background: 'hsl(var(--background))',
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
        // REVIEW : shadcn option
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
      // REVIEW : shadcn option
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)',
      // },
      fontSize: {
        12: [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: '400' },
        ],
        '12m': [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: '500' },
        ],
        '12sb': [
          '0.75rem',
          { lineHeight: '0.875rem', fontWeight: '600' },
        ],
        13: [
          '0.8125rem',
          { lineHeight: '1rem', fontWeight: '400' },
        ],
        '13m': [
          '0.8125rem',
          { lineHeight: '1rem', fontWeight: '500' },
        ],
        '13sb': [
          '0.8125rem',
          { lineHeight: '1rem', fontWeight: '600' },
        ],
        14: [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '400' },
        ],
        '14m': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '500' },
        ],
        '14sb': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '600' },
        ],
        '14b': [
          '0.875rem',
          { lineHeight: '1.0625rem', fontWeight: '700' },
        ],
        16: [
          '1rem',
          { lineHeight: '1.1875rem', fontWeight: '400' },
        ],
        '16m': [
          '1rem',
          { lineHeight: '1.1875rem', fontWeight: '500' },
        ],
        '16sb': [
          '1rem',
          { lineHeight: '1.1875rem', fontWeight: '600' },
        ],
        '16b': [
          '1rem',
          { lineHeight: '1.1875rem', fontWeight: '700' },
        ],
        18: [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '400' },
        ],
        '18m': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '500' },
        ],
        '18sb': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '600' },
        ],
        '18b': [
          '1.125rem',
          { lineHeight: '1.3125rem', fontWeight: '700' },
        ],
        20: [
          '1.25rem',
          { lineHeight: '1.5rem', fontWeight: '400' },
        ],
        '20m': [
          '1.25rem',
          { lineHeight: '1.5rem', fontWeight: '500' },
        ],
        '20sb': [
          '1.25rem',
          { lineHeight: '1.5rem', fontWeight: '600' },
        ],
        '20b': [
          '1.25rem',
          { lineHeight: '1.5rem', fontWeight: '700' },
        ],
        24: [
          '1.5rem',
          { lineHeight: '1.75rem', fontWeight: '400' },
        ],
        '24m': [
          '1.5rem',
          { lineHeight: '1.75rem', fontWeight: '500' },
        ],
        '24sb': [
          '1.5rem',
          { lineHeight: '1.75rem', fontWeight: '600' },
        ],
        '24b': [
          '1.5rem',
          { lineHeight: '1.75rem', fontWeight: '700' },
        ],
        '32sb': [
          '2rem',
          { lineHeight: '2.375rem', fontWeight: '600' },
        ],
        '32b': [
          '2rem',
          { lineHeight: '2.375rem', fontWeight: '700' },
        ],
        '40m': [
          '2.5rem',
          { lineHeight: '3rem', fontWeight: '500' },
        ],
      },
      screens: {
        mo: { max: '767px' }, // 모바일: 0 ~ 767px
        ta: { min: '768px', max: '1279px' }, // 태블릿: 768px ~ 1279px
        tamo: { max: '1279px' }, // 모바일+태블릿: 0 ~ 1279px
      },

      // 유틸리티 동적 생성
      spacing: ({ theme }) => {
        return generateSizes({
          limit: theme('spacingLimit', 2000),
          divider: theme('remDivider', 16),
          prefix: 'pr',
        });
      },
      borderRadius: ({ theme }) => {
        return generateSizes({
          limit: theme('borderRadiusLimit', 100),
          divider: theme('remDivider', 16),
          prefix: 'pr',
        });
      },
    },
    plugins: [
      plugin(function ({
        addUtilities,
        theme,
      }: {
        addUtilities: (
          utilities: Record<string, any>,
          options?: { variants?: string[] },
        ) => void;
        theme: (path: string, defaultValue?: any) => any;
      }) {
        const fontSizeLimit = theme('fontSizeLimit', 100);
        const remDivider = theme('remDivider', 16);

        // fontSize 유틸리티 동적 생성
        const fontSizes = generateSizes({
          limit: fontSizeLimit,
          divider: remDivider,
          prefix: 'text-pr',
        });

        // Tailwind 유틸리티 추가
        addUtilities(
          Object.fromEntries(
            Object.entries(fontSizes).map(
              ([key, value]) => [
                `.${key}`,
                { fontSize: value },
              ],
            ),
          ),
          { variants: ['responsive'] },
        );
      }),
    ],
    theme: {
      remDivider: 16, // 기본 remDivider 값 설정
      fontSizeLimit: 100, // 폰트 크기 제한
      spacingLimit: 2000, // 간격 제한
      borderRadiusLimit: 100, // border-radius 제한
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
