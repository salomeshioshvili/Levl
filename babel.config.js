module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // Includes react-native-worklets/plugin (required by Reanimated 4). Do not add
      // react-native-reanimated/plugin here — it is the same plugin and would run twice.
      "nativewind/babel",
    ],
  };
};
