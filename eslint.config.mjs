import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1) Global ignores (flat config does not read .eslintignore)
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "prisma/**",
      "public/**",
      "src/generated/**",
      "generated/**",
      "types/next-pwa.d.ts",
    ],
  },
  // 2) Base configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 3) Project rules applied to source files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
