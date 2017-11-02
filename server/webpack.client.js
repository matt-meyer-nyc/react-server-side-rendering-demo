const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {

  // tell webpack root file of our client application (entry point)
  // named client.js to differentiate, but essentially is same as would be index.js
  entry: './src/client/client.js',

  //  tell webpack where to put output file that's generated
  output: {

    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')

  }

};

//              'merge' function from imported webpack-merge library
module.exports = merge(baseConfig, config);
