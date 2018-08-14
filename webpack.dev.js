const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DIST = path.join(__dirname, 'dist');

module.exports = merge(common, {
  output: {
    filename: '[name].js'
  },
  devServer: {
    contentBase: DIST,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});
