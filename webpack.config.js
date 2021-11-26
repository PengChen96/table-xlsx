
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

const devConfig = ['commonjs2', 'umd'].map((libraryTarget) => {
  const name = libraryTarget === 'commonjs2' ? 'development' : `development.${libraryTarget}`;
  return {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `table-xlsx.${name}.js`,
      libraryTarget: libraryTarget
    },
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        'fs': false,
        'crypto': false,
      }
    },
    module: {
      rules: [{
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }],
    },
    externals: [nodeExternals()],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    ]
  }
});
const prodConfig = ['commonjs2', 'umd'].map((libraryTarget) => {
  const name = libraryTarget === 'commonjs2' ? 'production' : `production.${libraryTarget}`;
  return {
    mode: 'production',
    entry: './src/index',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `table-xlsx.${name}.js`,
      libraryTarget: libraryTarget
    },
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        'fs': false,
        'crypto': false,
      }
    },
    module: {
      rules: [{
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }],
    },
    externals: [nodeExternals()],
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    ]
  }
})
module.exports = [
  ...devConfig,
  ...prodConfig,
  {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `table-xlsx.esm.js`,
      library: {
        type: 'module'
      }
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        'fs': false,
        'crypto': false,
      }
    },
    module: {
      rules: [{
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }],
    },
    externals: [nodeExternals()],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    ]
  }
];
