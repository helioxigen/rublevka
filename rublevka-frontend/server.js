import fs from 'fs';
import path from 'path';
import global from 'window-or-global';
import express from 'express';
import expressPromBundleMiddleware from 'express-prom-bundle';
import expressCacheMiddleware from 'express-cache-response-directive';
import expressMinifier from 'express-minify-html';
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

import { INSTANCE, HOST } from './src/core/config/apps';
import {
  postcssPlugins,
  cssGeneratedScopeName as generateScopedName,
} from './scripts/webpack.config.shared';
import { reducer } from './src/store';

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
const config = require('./src/config/satellites/index').default; // eslint-disable-line import/no-dynamic-require

global.config = config[INSTANCE];
global.XMLHttpRequest = xhr;

// required because of MODULE
const manifest = require(`./build/${HOST}/manifest`); // eslint-disable-line import/no-dynamic-require
const routes = require('./src/Routes').default; // eslint-disable-line import/no-dynamic-require

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

  const stringifiedPreloadedState = JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c',
  );

  return {
    meta,
    body: `
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="utf-8">
          ${title}
          ${meta}
          ${link}
          <link href="/favicon.png" rel="icon" type="image/png">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
          <link rel="stylesheet" href="/${vendorCss}" />
          <link rel="stylesheet" href="/${appCss}" />
          ${styles}

          <script>
            window.releaseStage = "${APP_ENV}";
            window.appVersion = "${BUILD_ID}";
          </script>

          <script>
            var __cs = __cs || [];
            __cs.push(["setCsAccount", "${REACT_APP_UIS_ID}"]);
          </script>
          <script async src="https://app.uiscom.ru/static/cs.min.js"></script>
        </head>
        <body>
          <div id="app">${html}</div>

          <script>
            window.__PRELOADED_STATE__ = ${stringifiedPreloadedState}
          </script>

          <script>
            (function(w, d, s, h, id) {
                w.roistatProjectId = id; w.roistatHost = h;
                var p = d.location.protocol == "https:" ? "https://" : "http://";
                var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init";
                var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
            })(window, document, 'script', 'cloud.roistat.com', '${REACT_APP_ROISTAT_ID}');
          </script>

          <script>
            window._txq = window._txq || [];
            var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//st.targetix.net/txsp.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
            _txq.push(['createPixel', '${REACT_APP_TARGETIX_PIXEL_ID}']);
            _txq.push(['track', 'PageView']);
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
            fbq('init', '${REACT_APP_FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          </script>
          <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=${REACT_APP_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1"
          /></noscript>
          <!-- End Facebook Pixel Code -->

          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=${REACT_APP_GOOGLE_ANALYTICS_ID}"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${REACT_APP_GOOGLE_ANALYTICS_ID}');
          </script>

          <!-- Yandex.Metrika counter -->
          <script type="text/javascript" >
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${REACT_APP_YANDEX_METRIKA_ID}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          </script>
          <noscript><div><img src="https://mc.yandex.ru/watch/${REACT_APP_YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
          <!-- /Yandex.Metrika counter -->

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
      $: { content: 200 }, // eslint-disable-line id-length
    };

    const headers =
      (result.root.meta &&
        result.root.meta.filter(item => item.$.name === 'header')) ||
      [];

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

        metaHeaders.forEach(item => {
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

        // collect all data-loading promises
        const promises = renderProps.components
          .map(component => {
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
          .catch(e => {
            res.sendStatus(404);
            console.log(e); // eslint-disable-line no-console

            throw new Error('unhandled errors at promises');
          });
      } else {
        console.log(JSON.stringify(req)); // eslint-disable-line no-console
        res.status(404).send('Not found');
      }
    },
  );
}

// express app
const app = express();
const port = PORT || 8080;
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

// metrics and other
app.use('/healthz', (req, res) => res.sendStatus(200));
app.use(metricsMiddleware);
app.use(cacheMiddleware);
app.use(minifierMiddleware);

// static
app.use('/static', express.static(`./build/${HOST}/static`, { maxAge: '1y' }));
app.use('/robots.txt', (req, res) =>
  fs.createReadStream(`./build/${HOST}/robots.txt`).pipe(res),
);
app.use('/favicon.png', (req, res) =>
  fs.createReadStream(`./build/${HOST}/favicon.png`).pipe(res),
);

// Renderer
app.use(handleRender);

// We have to have the last unused `next` var so that express can
// treat this middleware as error-handling middleware.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500);
});

app.listen(port, '0.0.0.0', () => console.log(`started at 0.0.0.0:${port}`)); // eslint-disable-line no-console

process.on('uncaughtException', err => Sentry.captureException(err));
