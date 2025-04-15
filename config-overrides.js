const webpack = require('webpack');

module.exports = function override(config) {
  // Polyfill `process` using ProvidePlugin
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Use the correct module path
    }),
  ]);

  // Alias `process` to the browser polyfill
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      process: 'process/browser.js', // Use the correct module path
    },
  };

  return config;
};