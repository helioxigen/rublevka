import dtHttp from 'dthttp';
import { API as apiConfig } from './resources';
import httpMiddleware from './httpMiddleware';

const API = new dtHttp(apiConfig);
API.setHeader('Content-Type', 'application/json');
API.applyMiddleware(httpMiddleware);

export { API };
