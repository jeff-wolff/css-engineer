const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: './images/',
            outputPath: 'images',
            esModule: false
          } 
        }]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Jeff Wolff - HTML & CSS Engineer',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        minifyCSS: true
      },
      favicon: './src/images/logo.svg',
      template: './src/index.ejs'
    })
  ],
  experiments: {
    topLevelAwait: true
  },
};
