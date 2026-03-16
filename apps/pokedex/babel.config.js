module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      [
        "@tamagui/babel-plugin",
        { config: "../../packages/ui/src/tamagui.config.ts" },
      ],
    ],
  };
};
