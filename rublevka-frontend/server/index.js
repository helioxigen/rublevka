/* eslint-disable no-console */
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const handlePages = require('./handlePages');

const kinds = ['dom', 'uchastok', 'kvartira', 'taunhaus', 'penthaus', 'apartamenty'].join('|');
const dealTypes = ['prodaja', 'arenda'].join('|');

const param = {
    dealType: `:dealType(${dealTypes})`,
    kind: `:kind(${kinds})`,
};

app.prepare().then(() => {
    const server = express();

    handlePages('/', '/contacts', '/favorites')({
        '/catalog.map': `/zagorodnaya/${param.dealType}/map/${param.kind}?`,

        '/catalog': `/zagorodnaya/${param.dealType}/${param.kind}?`,
        '/item': `/zagorodnaya/${param.dealType}/${param.kind}/:id`,

        '/settlements.list': `/zagorodnaya/kottedzhnye-poselki`,
        '/settlements.item': `/zagorodnaya/kottedzhnye-poselki/(:name)_:id`,
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
