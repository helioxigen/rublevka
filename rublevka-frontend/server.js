/* eslint-disable no-console */
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use('/robots.txt', express.static(`./public/${process.env.APP_ENV}/robots.txt`));

    server.get('/', (req, res) => {
        return app.render(req, res, '/index', req.query);
    });

    server.get('/contacts', (req, res) => {
        return app.render(req, res, '/contacts', req.query);
    });

    server.get('/favorites', (req, res) => {
        return app.render(req, res, '/favorites', req.query);
    });

    server.get('/zagorodnaya/:dealType/map/:kind?', (req, res) => {
        return app.render(req, res, '/catalog.map', {
            dealType: req.params.dealType,
            kind: req.params.kind,
            ...req.query,
        });
    });

    server.get('/zagorodnaya/kottedzhnye-poselki', (req, res) => {
        return app.render(req, res, '/settlements.list', req.query);
    });

    server.get('/zagorodnaya/kottedzhnye-poselki/(:name)_:id', (req, res) => {
        return app.render(req, res, '/settlements.item', {
            id: req.params.id,
            permanentPath: `kottedzhnye-poselki/${req.params.name}_${req.params.id}`,
            ...req.query,
        });
    });

    server.get('/zagorodnaya/:dealType/:kind?', (req, res) => {
        return app.render(req, res, '/catalog', { dealType: req.params.dealType, kind: req.params.kind, ...req.query });
    });

    server.get('/zagorodnaya/:dealType/:kind/:id', (req, res) => {
        return app.render(req, res, '/item', {
            dealType: req.params.dealType,
            kind: req.params.kind,
            id: req.params.id,
        });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
