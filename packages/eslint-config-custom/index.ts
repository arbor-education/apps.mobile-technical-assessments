import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import globals from "globals";

export const arborEslintGlobals = {
  ...globals.browser,
  ...globals.node,
  ...globals.es2021,
  __DEV__: "readonly",
};

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier: prettierPlugin,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...arborEslintGlobals,
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*"],
        },
      ],
      // Enable the TS rule
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      ...configPrettier.rules, // Always put this last to override others
    },
  },
];
