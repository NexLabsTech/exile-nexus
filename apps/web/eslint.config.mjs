import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      ".astro/**", "dist/**", "node_modules/**",
      "test-results/**", "playwright-report/**"
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
