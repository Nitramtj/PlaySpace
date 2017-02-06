var path = require('path');

// The last file in the entry script is exported, however all scripts will be ran

const config = {
  entry: {
    client: './src/client.js',
    server: './src/server.js',
  },
  devtool: "cheap-eval-source-map",
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
