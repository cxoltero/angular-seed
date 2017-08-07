const isProductionBuild = process.env.NODE_ENV === 'production';
const shouldWatch = !isProductionBuild;
const shouldSingleRun = isProductionBuild;
const browser = isProductionBuild ? 'PhantomJS' : 'Chrome';
const webpackConfig = require('./webpack.config.common');
const webpack = require('webpack');

webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'tests/common.js',
    minChunks: ({ resource }) => {
      return resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/);
    }
  })
)

module.exports = (config) => {
  const logLevel = isProductionBuild ? config.LOG_DEBUG : config.LOG_INFO;

  config.set({
    basePath: './',
    frameworks: ['jasmine', 'es6-shim'],
    files: [
      'tests/common.js',
      'src/**/**/*.spec.js'
    ],

    preprocessors: {
      'tests/common.js': ['webpack', 'coverage'],
      'src/**/*.js': ['webpack', 'babel', 'coverage'],
      'src/**/*.ts': ['webpack', 'coverage']
    },

    webpack: webpackConfig,

    reporters: ['progress', 'dots', 'junit', 'coverage'],
    port: 9876,
    logLevel: logLevel,
    autoWatch: shouldWatch,
    browsers: [browser],
    singleRun: shouldSingleRun,
    concurrency: Infinity,
    junitReporter: {
      outputDir: './reports/',
      outputFile: 'test-results.xml',
      suite: 'seed-webapp',
      useBrowserName: false
    },
    coverageReporter: {
      type: 'cobertura',
      dir: './reports',
      subdir: 'coverage'
    }
  });

};