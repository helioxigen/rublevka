import webpack from 'webpack';
import { config } from './webpack.config.shared';

export default {
  ...config,
  entry: [...config.entry, 'webpack-hot-middleware/client'],
  output: {
    ...config.output,
    filename: 'app.js',
    publicPath: '/static',
  },
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devtool: 'eval-source-map',
};
