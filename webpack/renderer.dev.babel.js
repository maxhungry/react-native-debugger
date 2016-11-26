import webpack from 'webpack';
import baseConfig from './base.babel';

const host = 'localhost';
const port = 3000;

export default {
  ...baseConfig,
  entry: './app/index',
  devtool: 'inline-source-map',
  devServer: { host, port },
  output: {
    ...baseConfig.output,
    publicPath: `http://localhost:${port}/js/`,
  },
  module: {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
      },
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    ...baseConfig.resolve,
    packageAlias: 'browser',
  },
  target: 'electron-renderer',
};
