const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'public/index.html',
      template: 'public/index.html'
    }),
  ]
};