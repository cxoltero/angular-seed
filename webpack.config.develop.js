const commonConfig = require('./webpack.config.common');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');


commonConfig.module.rules[0].loaders.unshift('@angularclass/hmr-loader');

module.exports = webpackMerge(commonConfig, {

  output: {
    filename: '[name].[hash].bundle.js'
  },

  devServer: {
    port: 9000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    hot: true,
    inline: true,
    stats: {
      color: true
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

});