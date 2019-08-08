/* eslint-disable no-console */
const cacheableResponse = require('cacheable-response');

module.exports = (...staticPages) => (dynamicPagesMap = {}) => (app, server) => {
    const cachedRender = cacheableResponse({
        ttl: 1000 * 60 * 60, // 1hour
        get: async ({ req, res, pagePath, queryParams }) => ({
            data: await app.renderToHTML(req, res, pagePath, queryParams),
        }),
        send: ({ data, res }) => res.send(data),
    });

    const handleRender = pagePath => (req, res) =>
        cachedRender({
            req,
            res,
            pagePath,
            queryParams: {
                ...req.params,
                ...req.query,
            },
        });

    const handleRoute = (route, pagePath = route) => server.get(route, handleRender(pagePath));

    staticPages.forEach(route => {
        handleRoute(route);
    });

    Object.entries(dynamicPagesMap).forEach(([pagePath, route]) => {
        handleRoute(route, pagePath);
    });
};
