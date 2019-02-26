import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

import { MODULE } from '../src/core/config/apps';
import config, { cssGeneratedScopeName } from './webpack.config.shared';

export default {
  ...config,
  entry: {
    app: path.join(__dirname, '..', 'src', MODULE, 'index'),
  },
  output: {
    ...config.output,
    filename: 'static/bundle.[chunkhash].js',
  },
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true,
                importLoaders: 1,
                localIdentName: cssGeneratedScopeName,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    ...config.plugins,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      children: true,
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: 'app',
      filename: 'static/vendor.[chunkhash].js',
      minChunks: ({ context }) => context && context.includes('node_modules'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'static/manifest.js',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        '..',
        'src',
        'cem',
        'index.production.html',
      ),
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
      },
    }),
    new ExtractTextPlugin({
      filename: 'static/bundle.[contenthash].css',
      allChunks: true,
    }),
    new ManifestPlugin(),
  ],
  devtool: 'hidden-source-map',
};
