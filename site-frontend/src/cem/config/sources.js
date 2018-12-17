import dtHttp from 'dthttp';
import httpMiddleware from 'core/config/httpMiddleware';

const DADATA_KEY = '6d6a0bb1e95c16c090ccb3c6294147b036d4e3d9';
const DADATA = new dtHttp('https://dadata.ru/api/v2');
DADATA.setHeader('Authorization', `Token ${DADATA_KEY}`);
DADATA.setHeader('Content-Type', 'application/json');
DADATA.applyMiddleware(httpMiddleware);

const pdf = {
  source: 'http://jq.estate/pdf',
};

export { DADATA, pdf };
