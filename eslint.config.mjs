import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // 웹 바이탈 구칙 포함
    "next/typescript", // 타입스크립트 규칙 포함
    "prettier", // Prettier와 충돌하는 ESLint 규칙을 비활성화
    "plugin:import/recommended", // import 순서 및 구문 검사
    "plugin:jsx-a11y/recommended" // 접근성 규칙
  ),
  {
    plugins: ["unused-imports"], // 사용하지 않는 import 제거
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all",  args: "after-used", },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  {
    ignorePatterns: [".eslintrc.js", "next.config.js"],
  },
];

export default eslintConfig;
