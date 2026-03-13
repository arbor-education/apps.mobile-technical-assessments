module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@arbor-apps/db$": "<rootDir>/../../packages/db/src/index.ts",
    "^@arbor-apps/ui$": "<rootDir>/../../packages/ui/src/index.tsx",
    "^@arbor-apps/translations$":
      "<rootDir>/../../packages/translations/src/index.ts",
    "^@pokedex/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|expo-modules-core|react-native-mmkv|@nozbe/.*|tamagui|@tamagui/.*|immer)/)",
  ],
};
