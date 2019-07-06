/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
    target: 'serverless',
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: {
                                removeViewBox: false,
                            },
                        },
                    },
                },
            ],
        });

        config.resolve.alias['@components'] = path.join(__dirname, 'components');
        config.resolve.alias['@utils'] = path.join(__dirname, 'utils');
        config.resolve.alias['@hooks'] = path.join(__dirname, 'utils/hooks');
        config.resolve.alias['@config'] = path.join(__dirname, 'config');
        config.resolve.alias['@store'] = path.join(__dirname, 'store');
        config.resolve.alias['@api'] = path.join(__dirname, 'api');

        return config;
    },
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
        APP: process.env.APP || 'rublevka',
        APP_ENV: process.env.APP_ENV,
    },
};
