const path = require('path');

module.exports = {
  entry: './src/js/health.js',
  output: {
    filename: 'health.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  watch: true
};