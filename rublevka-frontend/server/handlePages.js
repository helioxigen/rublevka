/* eslint-disable no-console */
const cacheableResponse = require('cacheable-response');

const dev = process.env.NODE_ENV !== 'production';

module.exports = (...staticPages) => (dynamicPagesMap = {}) => (app, server) => {
    const cachedRender = cacheableResponse({
        ttl: 1000 * 60 * 60, // 1hour
        get: async ({ req, res, pagePath, query }) => ({
            data: await app.renderToHTML(req, res, pagePath, query),
        }),
        send: ({ data, res }) => res.send(data),
    });

    const handleRender = pagePath => (req, res) => {
        const query = {
            ...req.params,
            ...req.query,
        };

        if (dev) return app.render(req, res, pagePath, query);

        return cachedRender({
            req,
            res,
            pagePath,
            query,
        });
    };

    const handleRoute = (route, pagePath = route) => server.get(route, handleRender(pagePath));

    staticPages.forEach(route => {
        handleRoute(route);
    });

    Object.entries(dynamicPagesMap).forEach(([pagePath, route]) => {
        handleRoute(route, pagePath);
    });
};
