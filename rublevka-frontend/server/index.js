/* eslint-disable no-console */
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const handlePages = require('./handlePages');

app.prepare().then(() => {
    const server = express();

    handlePages('/', '/contacts', '/favorites')({
        '/catalog.map': '/zagorodnaya/:dealType/map/:kind?',
        '/settlements.list': '/zagorodnaya/kottedzhnye-poselki',
        '/settlements.item': '/zagorodnaya/kottedzhnye-poselki/(:name)_:id',
        '/catalog': '/zagorodnaya/:dealType/:kind?',
        '/item': '/zagorodnaya/:dealType/:kind/:id',
    })(app, server);

    server.use('/robots.txt', express.static(`./public/${process.env.APP_ENV}/robots.txt`));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
