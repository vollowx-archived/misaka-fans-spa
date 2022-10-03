const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinizerPlugin(),
    ],
  },
};
