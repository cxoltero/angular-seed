const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './index.ts',
    vendor: './vendor.ts'
  },

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].[name]chunk.js'
  },

  context: path.resolve(__dirname, 'src'),

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      // All files with a '.ts' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: path.join(__dirname, './index.html')
      }, {
        test: /\.(s)css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'dependency'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),

    new ProgressBarPlugin({
      format: chalk.blue('  build ') + '[:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),

    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ]
};