import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import Helmet from 'react-helmet';

import { HOST } from '../src/core/config/apps';

const manifest = require(`../build/${HOST}/manifest`);

const manifestJs = manifest['manifest.js'];
const vendorJs = manifest['vendor.js'];
const appJs = manifest['app.js'];
const vendorCss = manifest['vendor.css'];
const appCss = manifest['app.css'];

const {
  APP,
  NODE_ENV,
  APP_ENV,
  BUILD_ID,
  REACT_APP_SENTRY_DSN,
  REACT_APP_FACEBOOK_PIXEL_ID,
  REACT_APP_TARGETIX_PIXEL_ID,
  REACT_APP_ROISTAT_ID,
  REACT_APP_GOOGLE_ANALYTICS_ID,
  REACT_APP_YANDEX_METRIKA_ID,
  REACT_APP_UIS_ID,
} = process.env;

const template = fs
  .readFileSync(path.resolve(__dirname, './template.ejs'))
  .toString();

const compilePage = _.template(template);

export default function(renderProps, store) {
  const sheet = new ServerStyleSheet();

  const html = ReactDOMServer.renderToString(
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
    body: compilePage({
      preloadedState,
      stringifiedPreloadedState,
      html,
      head,
      title,
      meta,
      link,
      styles,
      manifestJs,
      vendorJs,
      appJs,
      vendorCss,
      appCss,
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
    }),
  };
}
