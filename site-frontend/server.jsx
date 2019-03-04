import fs from 'fs';
import path from 'path';
import global from 'window-or-global';
import express from 'express';
import expressPromBundleMiddleware from 'express-prom-bundle';
import expressCacheMiddleware from 'express-cache-response-directive';
import { parseString } from 'xml2js';
import dotenv from 'dotenv';

import xhr from 'xhr2';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { match, RoutingContext } from 'react-router';
import generateSitemaps from './server/sitemap';
import genPresentation from './server/presentation';

import { MODULE, INSTANCE, HOST } from './src/core/config/apps';
import {
  postcssPlugins,
  cssGeneratedScopeName as generateScopedName,
} from './scripts/webpack.config.shared';
import { reducer } from './src/site/store';

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
  SEGMENT_KEY,
  MAPBOX_TOKEN,
  COMAGIC_KEY,
  PORT,
  REACT_APP_SENTRY_DSN,
  REACT_APP_METRIKA_CODE,
} = process.env;

const envParams = {
  APP: !!APP,
  NODE_ENV: !!NODE_ENV,
  APP_ENV: !!APP_ENV,
  BUILD_ID: !!BUILD_ID,
  SEGMENT_KEY: !!SEGMENT_KEY,
  MAPBOX_TOKEN: !!MAPBOX_TOKEN,
};

const failedEnvParams = Object.keys(envParams).filter(param => !envParams[param]);

if (failedEnvParams.length > 0) throw new Error(`Provide ${failedEnvParams.join(', ')}`);

// Define a global config to use with application
const config = require(`./src/${MODULE}/config/satellites/index`).default; // eslint-disable-line import/no-dynamic-require
global.config = config[INSTANCE];
global.XMLHttpRequest = xhr;

// required because of MODULE
const manifest = require(`./build/${HOST}/manifest`); // eslint-disable-line import/no-dynamic-require
const routes = require(`./src/${MODULE}/Routes`).default; // eslint-disable-line import/no-dynamic-require

// const logger = createLogger();

const manifestJs = manifest['manifest.js'];
const vendorJs = manifest['vendor.js'];
const appJs = manifest['app.js'];
const vendorCss = manifest['vendor.css'];
const appCss = manifest['app.css'];

function renderFullPage(renderProps, store) {
  const sheet = new ServerStyleSheet();

  const html = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>,
    ),
  );

  const preloadedState = store.getState();
  const head = Helmet.rewind();
  const title = head ? head.title.toString() : '';
  const meta = head ? head.meta.toString() : '';
  const link = head ? head.link.toString() : '';
  const styles = sheet.getStyleTags();

  return {
    meta,
    body: `
      <!doctype html>
      <html>
        <head>
          ${title}
          ${meta}
          ${link}
          <link href="/favicon.png" rel="icon" type="image/png">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
          <meta charset="utf-8">
          <link rel="stylesheet" href="/${vendorCss}" />
          <link rel="stylesheet" href="/${appCss}" />
          ${styles}

          <script>
            window.releaseStage = "${APP_ENV}";
            window.appVersion = "${BUILD_ID}";

            !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0"; // eslint-disable-line
              analytics.load("${SEGMENT_KEY}");
            }}();
          </script>

          <!-- Facebook Pixel Code -->
          <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '795556230652439');
            fbq('track', 'PageView');
          </script>
          <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=795556230652439&ev=PageView&noscript=1"
          /></noscript>
          <!-- End Facebook Pixel Code -->
        </head>
        <body>
          <div id="app">${html}</div>

          <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.16.0/mapbox-gl.js"></script>
          <script>
            mapboxgl.accessToken="${MAPBOX_TOKEN}";
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>

          <script>
            (function(w, d, s, h, id) {
                w.roistatProjectId = id; w.roistatHost = h;
                var p = d.location.protocol == "https:" ? "https://" : "http://";
                var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init";
                var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
            })(window, document, 'script', 'cloud.roistat.com', 'eae5017254b3e856dfa7ab4274db5073');
          </script>
          <script>
            window._txq = window._txq || [];
            var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//st.targetix.net/txsp.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
            _txq.push(['createPixel', '59d249cd7bc72f3190025874']);
            _txq.push(['track', 'PageView']);
          </script>
          <script src="/${manifestJs}"></script>
          <script src="/${vendorJs}"></script>
          <script src="/${appJs}"></script>
        </body>
      </html>
    `,
  };
}

// Check meta tags for status-code and headers and set neccessary headers and status
function getStatusCode(meta, cb) {
  const xml = `<root>${meta}</root>`;

  parseString(xml, (err, result) => {
    const status = (result.root.meta &&
      result.root.meta.find(item => item.$.name === 'status-code')) || {
        $: { content: 200 },
      };

    const headers =
      (result.root.meta && result.root.meta.filter(item => item.$.name === 'header')) || [];

    cb({ status, headers });
  });
}

function sendResponse(res, status, metaHeaders, body) {
  if (status) {
    res.status(status.$.content);
    if (status.$.content >= 200 && status.$.content < 300) {
      res.send(body);
    } else {
      if (metaHeaders.length) {
        const headers = {};

        metaHeaders.forEach((item) => {
          headers[item.$.header] = item.$.content;
        });

        res.set(headers);
      }
      res.send();
    }
  } else {
    res.send(body);
  }
}

function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const initialState = {};

      const store = createStore(reducer, initialState, applyMiddleware(thunk));

      // collect all data-loading promises
      const promises = renderProps.components
        .map((component) => {
          // component can be undefined, so we have to check
          if (component && typeof component.loadServer === 'function') {
            // TODO pass renderProps as second param
            return component.loadServer(
              store.dispatch,
              renderProps.params,
              renderProps,
              store.getState(),
            );
          }

          return null;
        })
        .filter(elem => elem instanceof Promise);

      Promise.all(promises)
        .then(() => {
          const { body, meta } = renderFullPage(renderProps, store);

          getStatusCode(meta, ({ status, headers }) => {
            sendResponse(res, status, headers, body);
          });
        })
        .catch((e) => {
          res.sendStatus(404);
          console.log(e);

          throw new Error('unhandled errors at promises');
        });
    } else {
      console.log(JSON.stringify(req));
      res.status(404).send('Not found');
    }
  });
}

// express app
const app = express();
const port = PORT || 8080;
const cacheMiddleware = expressCacheMiddleware({ maxAge: 120 });
const metricsMiddleware = expressPromBundleMiddleware({ includeMethod: true });
Sentry.init({ dsn: REACT_APP_SENTRY_DSN, environment: APP_ENV });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// TODO move to pdf.js
app.use('/assets', express.static('server/presentation/assets'));
app.use('/pdf/properties/:category/:id/:token/:showLogo', genPresentation);

// TODO move to sitemap.js
app.use('/sitemap.xml', (req, res) => {
  fs.readFile(path.join(__dirname, 'build', HOST, 'sitemap.xml'), 'utf-8', (err, content) => {
    if (err && err.code === 'ENOENT') res.sendStatus(404);

    res.set('content-type', 'application/xml');
    res.send(content);
  });
});

const interval = 1000 * 60 * 60;
generateSitemaps();
setInterval(generateSitemaps, interval);

// metrics and other
app.use('/healthz', (req, res) => res.sendStatus(200));
app.use(metricsMiddleware);
app.use(cacheMiddleware);

// static .js and .css
app.use('/static', express.static(`./build/${HOST}/static`, { maxAge: '1y' }));
app.use('/robots.txt', (req, res) => fs.createReadStream(`./build/${HOST}/robots.txt`).pipe(res));
app.use('/favicon.png', (req, res) => fs.createReadStream(`./build/${HOST}/favicon.png`).pipe(res));

// Renderer
app.use(handleRender);

// We have to have the last unused `next` var so that express can
// treat this middleware as error-handling middleware.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500);
});

app.listen(port, '0.0.0.0', () => console.log(`started at http://localhost:${port}`)); // eslint-disable-line no-console

process.on('uncaughtException', err => Sentry.captureException(err));
