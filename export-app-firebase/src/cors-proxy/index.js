// https://github.com/7kfpun/cors-proxy

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const fetch = require('node-fetch');

/**
 * Returns the response body of the requested url, url should be encoded with encodeURIComponent if there are additional
 * parameters for the requested url.
 *
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/cors?url=https%3A%2F%2Fapi.ipify.org%3Fformat%3Djson
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' \
 *        -d '{"url": "https://api.ipify.org/?format=json"}' \
 *        https://us-central1-<project-id>.cloudfunctions.net/cors
 *
 * This endpoint supports CORS.
 */

function transformRes(r) {
  return r.headers.get('content-type') === 'application/json'
    ? r.json()
    : r.text();
}

function getBody(method, ctype, body) {
  if (method !== 'get') {
    if (ctype === 'application/json') return JSON.stringify(body);

    return body;
  }

  return null;
}

exports.cors = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const url = req.query.url ? req.query.url : req.body.url;

    if (!url) {
      res.status(403).send('URL is empty.');
    }

    fetch(url, {
      method: req.method,
      body: getBody(req.method, req.get('content-type'), req.body),
      headers: {
        'Content-Type': req.get('content-type'),
      },
    })
      .then(transformRes)
      .then(r => res.status(200).send(r));
  });
});
