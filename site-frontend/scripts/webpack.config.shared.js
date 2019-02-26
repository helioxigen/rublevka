import webpack from 'webpack';
import path from 'path';
import { MODULE } from '../src/core/config/apps';

const envParams = {
  APP: !!process.env.APP,
  NODE_ENV: !!process.env.NODE_ENV,
  APP_ENV: !!process.env.APP_ENV,
  BUILD_ID: process.env.NODE_ENV === 'development' || !!process.env.BUILD_ID,
};

const failedEnvParams = Object.keys(envParams).filter(
  param => !envParams[param],
);
if (failedEnvParams.length > 0)
  throw new Error(`Provide ${failedEnvParams.join(', ')}`);

export const cssGeneratedScopeName = '[hash:base64:5]';

export const postcssPlugins = [
  require('postcss-import'),
  require('postcss-sassy-mixins'),
  require('postcss-for'),
  require('postcss-conditionals'),
  require('postcss-simple-vars'),
  require('postcss-color-function'),
  require('postcss-mathjs'),
  require('postcss-nested'),
  require('autoprefixer')({
    browsers: ['last 2 versions'],
  }),
];

export const svgoOptions = {
  plugins: [
    { removeTitle: true },
    {
      removeAttrs: {
        attrs: ['fill', 'fill-rule'],
      },
    },
  ],
};

export default {
  entry: ['whatwg-fetch', path.join(__dirname, '..', 'src', MODULE, 'index')],
  output: {
    path: path.join(__dirname, '..', 'build', MODULE),
    publicPath: '/',
  },
  module: {
    // noParse: ['node_modules/react'],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              'env',
              {
                browsers: ['defaults', 'last 10 versions', 'not ie < 11'],
                useBuiltIns: true,
                modules: false,
              },
            ],
            'react',
          ],
          plugins: [
            'transform-async-to-generator',
            'transform-function-bind',
            'transform-object-rest-spread',
            'transform-react-remove-prop-types',
            'transform-class-properties',
            'transform-export-extensions',
          ],
        },
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        options: {
          name: 'static/[hash].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        include: [
          path.join(__dirname, '..', 'src', 'site', 'assets', 'images'),
        ],
        options: {
          name: 'static/[hash].[ext]',
        },
      },
      {
        test: /\.svg?$/,
        exclude: [
          path.join(__dirname, '..', 'src', 'site', 'assets', 'images'),
          /node_modules/,
        ],
        use: [
          'svg-sprite-loader',
          { loader: 'svgo-loader', options: svgoOptions },
        ],
      },
      {
        test: /\.woff2?$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[hash].[ext]',
          limit: 50000,
        },
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[hash].[ext]',
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.svg'],
    modules: [path.join(__dirname, '..', 'src'), 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        APP: JSON.stringify(process.env.APP),
        APP_ENV: JSON.stringify(process.env.APP_ENV),
        API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BUILD_ID: JSON.stringify(process.env.BUILD_ID),
        COMAGIC_KEY: JSON.stringify(process.env.COMAGIC_KEY),
        SEGMENT_KEY: JSON.stringify(process.env.SEGMENT_KEY),
        MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
        UPLOADCARE_KEY: JSON.stringify(process.env.UPLOADCARE_KEY),
        REACT_APP_SENTRY_DSN: JSON.stringify(process.env.REACT_APP_SENTRY_DSN),
        REACT_APP_METRIKA_CODE: JSON.stringify(
          process.env.REACT_APP_METRIKA_CODE,
        ),
      },
    }),
  ],
};
