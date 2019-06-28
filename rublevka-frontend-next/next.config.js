/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        config.resolve.alias.components = path.join(__dirname, 'components');
        config.resolve.alias.utils = path.join(__dirname, 'utils');

        return config;
    },
};
