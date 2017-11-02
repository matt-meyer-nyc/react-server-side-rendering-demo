const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');


const config = {

  //  inform webpack that we're building a bundle for nodeJS (rather than for a browswer)
  target: 'node',

  // tell webpack root file of our server application (entry point)
  entry: './src/index.js',

  //  tell webpack where to put output file that's generated
  output: {

    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')

  },

/* tells webpack not to bundle any libraries into output bundle on server
   if node exists in node modules folder
*/
  externals: [webpackNodeExternals()]

};

//              'merge' function from imported webpack-merge library
module.exports = merge(baseConfig, config);
