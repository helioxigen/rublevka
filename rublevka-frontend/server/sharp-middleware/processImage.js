const sharp = require('sharp');

module.exports = (imagePath, params = {}) => {
    const target = sharp(imagePath);

    return Object.entries(params).reduce((result, [operation, value]) => {
        if (operation === 'size') {
            const wh = value.split(',');

            return result.resize(parseInt(wh[0], 10), wh[1] ? parseInt(wh[1], 10) : undefined);
        }

        return result;
    }, target);
};
