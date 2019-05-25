//
// Webpack configuration
//

const webpack = require('webpack');
const path = require('path');

module.exports = {
   mode: 'development',

   entry: ['babel-polyfill', './src/js/react.js'],

   output: {
      path: path.join(__dirname, '/'),
      filename: 'src/js/bundle.js',
      publicPath: '/'
   },

   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
         },
         {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [ { loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" } ]
         }
      ]
   },

   plugins: [ new webpack.HotModuleReplacementPlugin() ]
};
