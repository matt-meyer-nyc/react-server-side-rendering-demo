module.exports = {

  // tell webpack to run Babel on every file it runs through
  module: {

    rules: [

      {
          //  ensure Babel only run on js files
        test: /\.js?$/,
        loader: 'babel-loader',
        // do not run Babel on node modules
        exclude: /node_modules/,
        options: {

          presets: [

            'react',
            'stage-0',
            // 'env' master preset
            ['env', { targets: { browsers: ['last 2 versions'] }}]

          ]

        }

      }

    ]

  }

};
