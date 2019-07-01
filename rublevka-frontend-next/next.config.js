/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.resolve.alias['@components'] = path.join(__dirname, 'components');
        config.resolve.alias['@utils'] = path.join(__dirname, 'utils');
        config.resolve.alias['@config'] = path.join(__dirname, 'config');
        config.resolve.alias['@store'] = path.join(__dirname, 'store');
        config.resolve.alias['@api'] = path.join(__dirname, 'api');

        return config;
    },
};
