const { handler } = require('./src');
const { cors } = require('./cors-proxy');

exports.handler = handler;
exports.cors = cors;
