/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const utils = require('./utils');
const processImage = require('./processImage');

module.exports = function sharpMiddleware(basePath, cacheDirName = '.cache', options = { quality: 70 }) {
    const cacheDir = path.join(basePath, cacheDirName);

    const cache = utils.createCache(cacheDir, process.env.NODE_ENV === 'development');

    return async (req, res, next) => {
        const filePath = url.parse(req.originalUrl, true, true).pathname;

        const requestCheck = utils.checkMimeType(
            filePath,
            req.headers.accept,
            ['image/jpeg', 'image/png'],
            'image/webp'
        );

        if (!requestCheck.allowed) return next();

        const hash = crypto
            .createHash('md5')
            .update(req.originalUrl)
            .digest('hex');

        const appendix = Object.keys(req.query).length > 0 ? `+${JSON.stringify(req.query)}` : '';

        const cachePath = path.join(cacheDir, `${hash}${appendix}+${options.quality}.${requestCheck.extension}`);
        const imgPath = path.join(basePath, filePath);

        const isCached = await utils.cacheExists(cachePath);

        if (isCached) {
            cache.add(cachePath);

            return res.sendFile(cachePath, err => {
                if (!err) return;

                cache.delete(cachePath);
                sharpMiddleware(req, res, next);
            });
        }

        try {
            await processImage(imgPath, req.query)
                .webp({ quality: parseInt(req.query.quality || '0', 10) || options.quality })
                .toFile(cachePath);

            cache.add(cachePath);
            res.sendFile(cachePath);
        } catch (err) {
            console.error(err);
            next();
        }
    };
};
