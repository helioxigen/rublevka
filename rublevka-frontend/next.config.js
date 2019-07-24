/* eslint-disable */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
path = require('path');

const alias = require('./resolve.config').resolve.alias;

const config = {
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
        },
    },
    useFileSystemPublicRoutes: false,
    distDir: `build/${process.env.HOST || 'default'}`,
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

        Object.keys(alias).forEach(key => {
            config.resolve.alias[key] = alias[key];
        });

        return config;
    },
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
        APP: process.env.APP || 'rublevka',
        APP_ENV: process.env.APP_ENV,
    },
};

module.exports = withBundleAnalyzer(config);
