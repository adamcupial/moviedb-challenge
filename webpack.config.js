const path = require('path');
const env = require('yargs').argv.mode;
const webpack = require('webpack');

const projectRoot = path.resolve(__dirname, '/');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const libraryName = 'moviedb-challenge';
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve('./src/templates/index.html'),
    hash: true,
    minify: {
      removeAttributeQuotes: true
    }
  })
];
let outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  eslint: {
    configFile: path.resolve('.eslintrc.json')
  },
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /(node_modules|bower_components|test)/
      }
    ],
    node: {
      fs: 'empty' // avoids error messages
    },
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    alias: {
      components: path.resolve('./src/components'),
      services: path.resolve('./src/services'),
      templates: path.resolve('./src/templates')
    },
    extensions: ['', '.js']
  },
  plugins
};

module.exports = config;
