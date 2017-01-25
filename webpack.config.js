var path = require('path');

const config = {
  entry: {
    client: './src/client.js',
    server: './src/server.js',
    both: ['./src/sample1.js', './src/sample2.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.json$/, use: 'json-loader'},
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;
