const functions = require('firebase-functions');
const xmlHandler = require('./cian-xml-feed/src');
const pdfApp = require('./pdf/src/server');

exports.handler = functions.pubsub.topic('update-xml').onPublish(xmlHandler);
exports.pdf = functions.https.onRequest(pdfApp);
