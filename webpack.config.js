const path = require('path');

module.exports = {
  mode: 'production',
  entry: './path/to/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'aniframe.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};