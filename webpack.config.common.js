const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    polyfills: './polyfills.ts',
    vendor: './vendor.ts',
    index: './index.ts'
  },

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: 'chunk.[hash].bundle.js'
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
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
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
        loader: 'raw-loader!sass-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: 'index.html'
      // chunksSortMode: function (chunk1, chunk2) {
      //   const order = ['polyfills', 'vendor', 'index'];
      //   const first = order.indexOf(chunk1.names[0]);
      //   const second = order.indexOf(chunk2.names[0]);
      //   return first - second;
      // }
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
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, 'src')
    ),

    new webpack.ProvidePlugin({
      Reflect: 'core-js/es7/reflect'
    })
  ]
};