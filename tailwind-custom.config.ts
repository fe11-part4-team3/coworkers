import type { Config } from 'tailwindcss';

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
  for (let i = 0; i <= limit * 10; i++) {
    const value = i / 10 / divider;
    const key =
      i % 10 === 0 ? `${prefix}-${i / 10}` : `${prefix}-${(i / 10).toFixed(1)}`;
    sizes[key] = `${value}rem`;
  }
  return sizes;
};

export const customConfig: Config = {
  content: [],
  theme: {
    extend: {
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
            Object.entries(fontSizes).map(([key, value]) => [
              `.${key}`,
              { fontSize: value },
            ]),
          ),
          { variants: ['responsive'] },
        );
      }),
    ],
  },
};
