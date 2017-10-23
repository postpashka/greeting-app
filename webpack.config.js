const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const font = require('./webpack/font');
const images = require('./webpack/images');
const script = require('./webpack/script');
const gz = require('./webpack/gz');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};
const DIST_DIR = 'build';


const common = merge([{
  entry: {
    app: PATHS.source + '/app.js'
//    app2: PATHS.build + '/app.js.gz'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name]-chunk.js',
    path: PATHS.build
  },
  externals: {
    "window":"window"
  },
  plugins: [
    new workboxPlugin({
      globDirectory: DIST_DIR,
      globPatterns: ['*.{html,js,css, json}'],
      swDest: 'sw.js',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.source + '/index.pug',
      async: ['app', 'vendors'],
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
//    new UglifyJSPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.*.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
/*    new CompressionPlugin({
      asset: "[path].gz[query]",
      test: /\.js$|\.css$|\.html$/,
      algorithm: "gzip"
    })*/
  ]
},
pug(),
font(),
images(),
sass(),
css(),
gz(),
script()
]);


module.exports = function(env) {
  if (env === 'production'){
    return common;
  }
  if (env === 'development'){
    return merge([
      common,
      devserver()
    ])
  }
};