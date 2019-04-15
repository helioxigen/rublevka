const functions = require('firebase-functions');
const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const cors = require('cors');
const express = require('express');
const path = require('path');
const chunk = require('lodash.chunk');
const pluralize = require('pluralize-ru');

const apiRequests = require('./api');
const { parseAddress, pluralizedKinds } = require('./utils');

const app = express();

app.use(express.static(path.join(`${__dirname}/public`)));
app.use(cors({ origin: true }));
app.set('view engine', 'pug');
app.set('views', path.join(`${__dirname}/views`));

app.get('/html/:id', (req, res) => {
  apiRequests
    .getProperty(req.params.id)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Не смогли загрузить объект :('));
    })
    .then((json) => {
      const urls = json.images
        .filter(imgJson => imgJson.isPublic)
        .map(imgJson => apiRequests.getImgUrl(imgJson.id, 1024));

      const layoutUrls = json.layoutImages
        .filter(imgJson => imgJson.isPublic)
        .map(imgJson => apiRequests.getImgUrl(imgJson.id, 1024));

      const parsedUrls = chunk(urls.slice(1), 2);
      const { location } = json;

      const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      })
        .format(json.saleOffer.multiCurrencyPrice.usd)
        .split(',')
        .join(' ');

      const state = {
        pluralize,
        pluralizedKind: pluralizedKinds[json.kind],
        overviewImgUrl: urls[0],
        address: parseAddress(location),
        price,
        imgUrls: parsedUrls,
        layoutUrls,
        location,
        longitude: location.longitude,
        latitude: location.latitude,
        landDetails: json.landDetails,
        specification: json.specification,
      };

      res.render('index', state);
    });
});

app.get('/:id', (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(
      `https://us-central1-rublevka-export-384da.cloudfunctions.net/pdf/html/${
        req.params.id
      }`,
      {
        waitUntil: 'networkidle2',
      },
    );
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
    res.type('application/pdf');
    res.send(buffer);
    browser.close();
  })();
});

module.exports = app;
