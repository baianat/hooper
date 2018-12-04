const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


// render page
const page = (name) => {
  return new HtmlWebpackPlugin({
    inject: true,
    template: path.join(__dirname, `./${name}.html`),
    filename: path.join(__dirname, `./dist/${name}.html`)
  });
};

const config = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: {
    app: path.join(__dirname, './app.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new ProgressBarPlugin(),
    page('index'),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  }
};

module.exports = config;
