import fs from 'fs';
import path from 'path';
import xmlbuilder from 'xmlbuilder';
import pnow from 'performance-now';

import getItems from './getItems';

import { INSTANCE, HOST } from '../src/core/config/apps';
import configs from '../src/config/satellites';

import * as dict from '../src/constants/properties/dictionaries';
import { nameToSlug } from '../src/core/helpers/nameToSlug';

const initialDate = new Date('2017-09-08');

const kindsByCategoryAndDealType = {
  country: {
    sale: ['flat', 'house', 'townhouse', 'land'],
    rent: ['flat', 'house', 'townhouse'],
  },
};

const routeIds = configs[INSTANCE].routes.map(route => route.id) || [];

const appendXmlUrl = (xml, loc, lastmod, changefreq, priority) => {
  const urlEle = xml.ele('url');

  urlEle.ele('loc', {}, loc);
  if (lastmod) urlEle.ele('lastmod', {}, lastmod);
  if (changefreq) urlEle.ele('changefreq', {}, changefreq);
  if (priority) urlEle.ele('priority', {}, priority);
};

const getDate = updatedAt =>
  updatedAt < initialDate
    ? initialDate.toISOString().split('T')[0]
    : updatedAt.toISOString().split('T')[0];

function generatePropertyIds(xml, category = 'country') {
  return getItems(`/v1/properties/${category}`, routeIds, {
    'filter[state]': ['public', 'rented'],
  }).then(items =>
    items.map(({ id, kind, saleOffer, rentOffer, updatedAt }) => {
      const categoryTranslit = dict.categoriesTranslit[category];
      const saleTranslit = dict.dealTypesTranslit.sale;
      const rentTranslit = dict.dealTypesTranslit.rent;
      const kindTranslit = dict.kindsTranslit[kind];

      const saleUrl =
        saleOffer &&
        `https://${HOST}/${categoryTranslit}/${saleTranslit}/${kindTranslit}/${id}`;

      const rentUrl =
        rentOffer &&
        `https://${HOST}/${categoryTranslit}/${rentTranslit}/${kindTranslit}/${id}`;

      const lastMod = getDate(new Date(updatedAt));

      return [saleUrl, rentUrl]
        .filter(url => url)
        .map(url => {
          appendXmlUrl(xml, url, lastMod);

          // return { url, lastMod, frequency: 'daily', priority: 1.0 };
        });
    }),
  );
}

function generatePropertiesList(xml, category = 'country') {
  return new Promise(resolve => {
    resolve(
      Object.keys(kindsByCategoryAndDealType[category]).forEach(dealType => {
        const categoryTranslit = dict.categoriesTranslit[category];
        const dealTypeTranslit = dict.dealTypesTranslit[dealType];

        appendXmlUrl(
          xml,
          `https://${HOST}/${categoryTranslit}/${dealTypeTranslit}`,
          null,
          'daily',
          1.0,
        );

        return kindsByCategoryAndDealType[category][dealType].map(kind => {
          const kindTranslit = dict.kindsTranslit[kind];
          const url = `https://${HOST}/${categoryTranslit}/${dealTypeTranslit}/${kindTranslit}`;

          appendXmlUrl(xml, url, null, 'daily', 1.0);
          // return { url };
        });
      }),
    );
  });
}

function generatePlaces(xml) {
  const dealTypes = ['sale', 'rent'];

  return getItems('/v1/places/localities', routeIds).then(items =>
    items.map(({ id, name, updatedAt }) =>
      dealTypes.map(dealType => {
        const kindTranslit = dict.placeKindsTranslit.localities;
        const dealTypeTranslit = dict.dealTypesTranslit[dealType];
        const nameId = `${nameToSlug(name)}_${id}`;

        const url = `https://${HOST}/zagorodnaya/${kindTranslit}/${nameId}/${dealTypeTranslit}`;

        // const lastMod = getDate(new Date(updatedAt));

        appendXmlUrl(xml, url, null, 'daily', 1.0);

        // return { url, lastMod, frequency: 'daily', priority: 1.0 };
      }),
    ),
  );
}

function generateSettlements(xml) {
  return getItems('/v1/places/settlements', routeIds, {
    'filter[state]': 'public',
  }).then(items =>
    items.map(({ name, id, updatedAt }) => {
      const nameId = `${nameToSlug(name)}_${id}`;
      const url = `https://${HOST}/zagorodnaya/kottedzhnye-poselki/${nameId}`;
      const lastMod = getDate(new Date(updatedAt));

      appendXmlUrl(xml, url, lastMod, 'daily', 1.0);
      // return { url, lastMod, frequency: 'daily', priority: 1.0 };
    }),
  );
}

function generateRoutes(xml) {
  const dealTypes = ['sale', 'rent'];

  return getItems('/v1/places/routes', [], {
    'filter[id]': routeIds,
  }).then(items =>
    dealTypes.map(dealType => {
      const dealTypeTranslit = dict.dealTypesTranslit[dealType];

      return items.map(({ name, id, updatedAt }) => {
        const nameId = `${nameToSlug(name)}_${id}`;
        const url = `https://${HOST}/zagorodnaya/shosse/${nameId}/${dealTypeTranslit}`;
        // const lastMod = getDate(new Date(updatedAt));

        appendXmlUrl(xml, url, null, 'daily', 1.0);
        // return { url, lastMod, frequency: 'daily', priority: 1.0 };
      });
    }),
  );
}

function generateSite() {
  const t0 = pnow();
  const xml = xmlbuilder.create('urlset');

  console.log('[sitemap] started generate'); // eslint-disable-line no-console

  xml.dec('1.0', 'UTF-8');
  xml.att({ xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  return Promise.all([
    generatePropertyIds(xml),
    generatePropertiesList(xml),
    generatePlaces(xml),
    generateRoutes(xml),
    generateSettlements(xml),
  ])
    .then(() => {
      // TODO: not appendXmlUrl in each function,
      // but each function must return object with values
      // and then we just items.map(appendXmlUrl)
      xml.end({ pretty: true });

      const xmlString = `<?xml version="1.0" encoding="UTF-8"?>\n${xml.toString()}`;
      const pathToSitemap = path.join(
        __dirname,
        '..',
        'build',
        HOST,
        'sitemap.xml',
      );

      fs.writeFile(pathToSitemap, xmlString, err => {
        if (err) throw err;

        const t1 = pnow();
        console.log(`[sitemap] generated by ${t1 - t0} ms to ${pathToSitemap}`); // eslint-disable-line no-console
      });
    })
    .catch(err => console.error(err));
}

export default function generateSitemaps() {
  generateSite(configs[INSTANCE]);
}
