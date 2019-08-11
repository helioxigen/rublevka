const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');
const pnow = require('performance-now');

const getItems = require('./getItems');
const translit = require('../../utils/dict/translit');

const initialDate = new Date('2017-09-08');

const kindsByCategoryAndDealType = {
    country: {
        sale: ['flat', 'house', 'townhouse', 'land'],
        rent: ['flat', 'house', 'townhouse'],
    },
};

const routeIds = require('../../config/routes.json')[process.env.APP];

const { HOST } = process.env;

const appendXmlUrl = (xml, loc, lastmod, changefreq, priority) => {
    const urlEle = xml.ele('url');

    urlEle.ele('loc', {}, loc);
    if (lastmod) urlEle.ele('lastmod', {}, lastmod);
    if (changefreq) urlEle.ele('changefreq', {}, changefreq);
    if (priority) urlEle.ele('priority', {}, priority);
};

const getDate = updatedAt =>
    updatedAt < initialDate ? initialDate.toISOString().split('T')[0] : updatedAt.toISOString().split('T')[0];

function generatePropertyIds(xml, category = 'country') {
    return getItems(`/v1/properties/${category}`, routeIds, {
        'filter[state]': ['public', 'rented'],
    }).then(items =>
        items.map(({ id, kind, saleOffer, rentOffer, updatedAt }) => {
            const [saleTranslit, rentTranslit, kindTranslit, categoryTranslit] = translit.byWord(
                'sale',
                'rent',
                kind,
                category
            );

            const saleUrl = saleOffer && `https://${HOST}/${categoryTranslit}/${saleTranslit}/${kindTranslit}/${id}`;

            const rentUrl = rentOffer && `https://${HOST}/${categoryTranslit}/${rentTranslit}/${kindTranslit}/${id}`;

            const lastMod = getDate(new Date(updatedAt));

            return [saleUrl, rentUrl]
                .filter(url => url)
                .forEach(url => {
                    appendXmlUrl(xml, url, lastMod);

                    // return { url, lastMod, frequency: 'daily', priority: 1.0 };
                });
        })
    );
}

function generatePropertiesList(xml, category = 'country') {
    return new Promise(resolve => {
        resolve(
            Object.keys(kindsByCategoryAndDealType[category]).forEach(dealType => {
                const [categoryTranslit, dealTypeTranslit] = translit.byWord(category, dealType);

                appendXmlUrl(xml, `https://${HOST}/${categoryTranslit}/${dealTypeTranslit}`, null, 'daily', 1.0);

                return kindsByCategoryAndDealType[category][dealType].forEach(kind => {
                    const kindTranslit = translit.byWord(kind);
                    const url = `https://${HOST}/${categoryTranslit}/${dealTypeTranslit}/${kindTranslit}`;

                    appendXmlUrl(xml, url, null, 'daily', 1.0);
                    // return { url };
                });
            })
        );
    });
}

function generatePlaces(xml) {
    const dealTypes = ['sale', 'rent'];

    return getItems('/v1/places/localities', routeIds).then(items =>
        items.map(({ id, name }) =>
            dealTypes.forEach(dealType => {
                const [kindTranslit, dealTypeTranslit] = translit.byWord('localities', dealType);
                const nameId = `${translit.byLetters(name)}_${id}`;

                const url = `https://${HOST}/zagorodnaya/${kindTranslit}/${nameId}/${dealTypeTranslit}`;

                // const lastMod = getDate(new Date(updatedAt));

                appendXmlUrl(xml, url, null, 'daily', 1.0);

                // return { url, lastMod, frequency: 'daily', priority: 1.0 };
            })
        )
    );
}

function generateSettlements(xml) {
    return getItems('/v1/places/settlements', routeIds, {
        'filter[state]': 'public',
    }).then(items =>
        items.forEach(({ name, id, updatedAt }) => {
            const nameId = `${translit.byLetters(name)}_${id}`;
            const url = `https://${HOST}/zagorodnaya/kottedzhnye-poselki/${nameId}`;
            const lastMod = getDate(new Date(updatedAt));

            appendXmlUrl(xml, url, lastMod, 'daily', 1.0);
            // return { url, lastMod, frequency: 'daily', priority: 1.0 };
        })
    );
}

function generateRoutes(xml) {
    const dealTypes = ['sale', 'rent'];

    return getItems('/v1/places/routes', [], {
        'filter[id]': routeIds,
    }).then(items =>
        dealTypes.map(dealType => {
            const dealTypeTranslit = translit.byWord(dealType);

            return items.forEach(({ name, id }) => {
                const nameId = `${translit.byLetters(name)}_${id}`;
                const url = `https://${HOST}/zagorodnaya/shosse/${nameId}/${dealTypeTranslit}`;
                // const lastMod = getDate(new Date(updatedAt));

                appendXmlUrl(xml, url, null, 'daily', 1.0);
                // return { url, lastMod, frequency: 'daily', priority: 1.0 };
            });
        })
    );
}

function generateSitemap() {
    const t0 = pnow();
    const xml = xmlbuilder.create('urlset');

    console.log('[sitemap] Generation started'); // eslint-disable-line no-console

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
            const pathToSitemap = path.join(__dirname, '../../public', 'sitemap.xml');

            fs.writeFile(pathToSitemap, xmlString, err => {
                if (err) throw err;

                const t1 = pnow();
                console.log(`[sitemap] Generated by ${t1 - t0} ms to ${pathToSitemap}`); // eslint-disable-line no-console
            });
        })
        .catch(err => console.error(err));
}

function useSitemap() {
    if (process.env.NODE_ENV !== 'production') return;

    const interval = 1000 * 60 * 60;
    generateSitemap();
    setInterval(generateSitemap, interval);
}

module.exports = {
    useSitemap,
};
