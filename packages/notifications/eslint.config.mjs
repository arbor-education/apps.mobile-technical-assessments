import customConfig, {
  arborEslintGlobals,
} from "@arbor-apps/eslint-config-custom";

export default [
  ...customConfig,
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...arborEslintGlobals,
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        jest: "readonly",
      },
    },
  },
  {
    rules: {},
  },
];
