const { handler } = require('./src');
const { cors } = require('./src/cors-proxy');

exports.handler = handler;
exports.cors = cors;
