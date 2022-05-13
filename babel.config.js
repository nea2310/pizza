module.exports = {
  presets: [
    "@babel/env",
    "@babel/react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-proposal-private-methods",
    // "@babel/plugin-proposal-decorators", { "legacy": true },
    "@babel/plugin-proposal-class-properties",
  ]
};