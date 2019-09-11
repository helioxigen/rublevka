/* eslint-disable no-console */
const express = require('express');
const next = require('next');
// const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const handlePages = require('./handlePages');
// const sharpMiddleware = require('./sharp-middleware');

const { useSitemap } = require('./sitemap');

const kinds = ['dom', 'uchastok', 'kvartira', 'taunhaus', 'penthaus', 'apartamenty'].join('|');
const dealTypes = ['prodaja', 'arenda'].join('|');

const param = {
    dealType: `:dealType(${dealTypes})`,
    kind: `:kind(${kinds})`,
};

useSitemap();

// const basePath = path.resolve(__dirname, '..');

app.prepare().then(() => {
    const server = express();

    // server.use(sharpMiddleware(basePath));

    handlePages('/', '/contacts', '/favorites')({
        '/catalog.map': `/zagorodnaya/${param.dealType}/map/${param.kind}?`,

        '/catalog': `/zagorodnaya/${param.dealType}/${param.kind}?`,
        '/item': `/zagorodnaya/${param.dealType}/${param.kind}/:id`,

        '/settlements.list': `/zagorodnaya/kottedzhnye-poselki`,
        '/settlements.item': `/zagorodnaya/kottedzhnye-poselki/(:name)_:id`,
    })(app, server);

    server.use('/robots.txt', express.static(`./public/${process.env.APP_ENV}/robots.txt`));
    server.use('/sitemap.xml', express.static(`./public/sitemap.xml`));

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
