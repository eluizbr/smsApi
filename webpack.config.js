var path = require('path');
module.exports = {
  entry: path.resolve(__dirname, './app/core/enviou.module.js'),
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'bundle.js'
  },
  externals: {
    'angular': 'angular'
  }
};
