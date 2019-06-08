import fs from 'fs';
import path from 'path';
import global from 'window-or-global';
import express from 'express';
import expressPromBundleMiddleware from 'express-prom-bundle';
import expressCacheMiddleware from 'express-cache-response-directive';
import expressMinifier from 'express-minify-html';
import dotenv from 'dotenv';
import xhr from 'xhr2';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { match } from 'react-router';
import generateSitemaps from './sitemap';

import { INSTANCE, HOST } from '../src/core/config/apps';
import {
  postcssPlugins,
  cssGeneratedScopeName as generateScopedName,
} from '../scripts/webpack.config.shared';
import { reducer } from '../src/store';
import { relativeTo } from './utils';
import renderPage from './renderPage';
import { getStatusCode, sendResponse } from './responseHandlers';

const Sentry = require('@sentry/node'); // import is not working

dotenv.config();

// hook for svg assets
require('asset-require-hook')({ extensions: ['jpg', 'svg', 'png'] });

// hook for css modules
require('css-modules-require-hook')({
  prepend: postcssPlugins,
  generateScopedName,
});

const {
  APP,
  NODE_ENV,
  APP_ENV,
  BUILD_ID,
  PORT,
  REACT_APP_SENTRY_DSN,
  REACT_APP_FACEBOOK_PIXEL_ID,
  REACT_APP_TARGETIX_PIXEL_ID,
  REACT_APP_ROISTAT_ID,
  REACT_APP_GOOGLE_ANALYTICS_ID,
  REACT_APP_YANDEX_METRIKA_ID,
  REACT_APP_UIS_ID,
} = process.env;

const requiredParams = {
  development: {
    APP,
    APP_ENV,
    NODE_ENV,
    BUILD_ID,
    REACT_APP_SENTRY_DSN,
  },
  production: {
    APP,
    APP_ENV,
    NODE_ENV,
    BUILD_ID,
    REACT_APP_SENTRY_DSN,
    REACT_APP_FACEBOOK_PIXEL_ID,
    REACT_APP_TARGETIX_PIXEL_ID,
    REACT_APP_ROISTAT_ID,
    REACT_APP_GOOGLE_ANALYTICS_ID,
    REACT_APP_YANDEX_METRIKA_ID,
    REACT_APP_UIS_ID,
  },
};

const failedParams = Object.keys(requiredParams[APP_ENV]).filter(
  p => !requiredParams[APP_ENV][p],
);

if (failedParams.length > 0) {
  throw new Error(`Provide ${failedParams.join(', ')}`);
}

// Define a global config to use with application
const config = require('../src/config/satellites/index').default; // eslint-disable-line import/no-dynamic-require
const routes = require('../src/Routes').default; // eslint-disable-line import/no-dynamic-require

global.config = config[INSTANCE];
global.XMLHttpRequest = xhr;

// express app
const app = express();
const port = PORT || 3000;
const cacheMiddleware = expressCacheMiddleware({ maxAge: 120 });
const metricsMiddleware = expressPromBundleMiddleware({ includeMethod: true });
const minifierMiddleware = expressMinifier({ override: true });

Sentry.init({ dsn: REACT_APP_SENTRY_DSN, environment: APP_ENV });
Sentry.configureScope(scope => {
  scope.setTag('version', BUILD_ID);
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// TODO move to sitemap.js
app.use('/sitemap.xml', (req, res) => {
  fs.readFile(
    path.join(__dirname, 'build', HOST, 'sitemap.xml'),
    'utf-8',
    (err, content) => {
      if (err && err.code === 'ENOENT') res.sendStatus(404);

      res.set('content-type', 'application/xml');
      res.send(content);
    },
  );
});

const interval = 1000 * 60 * 60;
generateSitemaps();
setInterval(generateSitemaps, interval);

const buildPath = relativeTo(`../build/${HOST}`);

// metrics and other
app.use('/healthz', (req, res) => res.sendStatus(200));
app.use(metricsMiddleware);
app.use(cacheMiddleware);
app.use(minifierMiddleware);

// static
app.use(
  '/static',
  express.static(buildPath('static'), {
    maxAge: '1y',
  }),
);
app.use('/robots.txt', (req, res) =>
  fs.createReadStream(buildPath('robots.txt')).pipe(res),
);
app.use('/favicon.png', (req, res) =>
  fs.createReadStream(buildPath('favicon.png')).pipe(res),
);

// Renderer
app.use((req, res) =>
  match(
    { routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const initialState = {};

        const store = createStore(
          reducer,
          initialState,
          applyMiddleware(thunk),
        );

        if (
          'id' in renderProps.params &&
          renderProps.params.id.includes('.jpg')
        ) {
          return res.sendStatus(204);
        }

        // collect all data-loading promises
        const promises = renderProps.components
          .filter(
            component =>
              component && typeof component.loadServer === 'function',
          )
          .map(component =>
            component.loadServer(
              store.dispatch,
              renderProps.params,
              renderProps,
              store.getState(),
            ),
          );

        Promise.all(promises)
          .then(() => {
            const { body, meta } = renderPage(renderProps, store);

            getStatusCode(meta, ({ status, headers }) => {
              sendResponse(res, status, headers, body);
            });
          })
          .catch(err => {
            res.sendStatus(404);
            console.error('[RENDER] Unhandled errors at promises: ', err);
          });
      } else {
        console.log('[RENDER] Unhandled request: ', JSON.stringify(req)); // eslint-disable-line no-console
        res
          .status(404)
          .send(
            APP_ENV === 'development'
              ? `Not found with req: ${JSON.stringify(req)}`
              : 'Not found',
          );
      }
    },
  ),
);

// We have to have the last unused `next` var so that express can
// treat this middleware as error-handling middleware.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500);
});

app.listen(port, '0.0.0.0', () => console.log(`started at 0.0.0.0:${port}`)); // eslint-disable-line no-console

process.on('uncaughtException', err => {
  Sentry.captureException(err);
  console.error(err.message, err.stack);
});
