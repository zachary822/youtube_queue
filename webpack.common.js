/**
 * @author zacharyjuang
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const APP_DIR = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

const config = {
  entry: [
    path.join(APP_DIR, 'index.jsx')
  ],
  output: {
    path: DIST,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(ttf|eot|svg|gif|woff(2)?)(\?[a-z0-9]+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  externals: {
    yt: 'YT'
  }
};

module.exports = config;
