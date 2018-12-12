import path from 'path';
import express from 'express';
import webpack from 'webpack';
import httpProxy from 'http-proxy-middleware';
import { MODULE } from '../src/core/config/apps';
import config from './webpack.config.dev';

const app = express();
const compiler = webpack(config);
const proxyOptions = {
  changeOrigin: true,
  // target: 'http://localhost:8080/',
  target: 'https://api-dev.jqestate.ru/',
  pathRewrite: {
    '^/api-dev': '',
  },
};

const webpackDevOptions = {
  noInfo: true,
  publicPath: config.output.publicPath,
  contentBase: '../src',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
};

const devMiddleware = require('webpack-dev-middleware')(compiler, webpackDevOptions);
const hotMiddleware = require('webpack-hot-middleware')(compiler);

const proxy = httpProxy(proxyOptions);

app.use(devMiddleware);
app.use(hotMiddleware);
app.use('/api-dev/*', proxy);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', MODULE, 'index.development.html'));
});

const { PORT = 3000 } = process.env;
app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost:%s', PORT); // eslint-disable-line no-console
});
