const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  devServer: {
    port: 4002,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue']
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'vueApp',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.ts'
      },
      shared: {
        vue: { singleton: true, eager: true, requiredVersion: '^3.0.0' },
        'vue-router': { singleton: true, eager: true, requiredVersion: '^4.0.0' }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin()
  ]
};
