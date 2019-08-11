/* eslint-disable */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withCSS = require('@zeit/next-css');
path = require('path');

const alias = require('./resolve.config').resolve.alias;

const config = {
    generateBuildId: () => process.env.DRONE_COMMIT,
    generateEtags: false,
    cssLoaderOptions: {
        url: false,
    },
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

        REACT_APP_YANDEX_METRIKA_ID: process.env.REACT_APP_YANDEX_METRIKA_ID,
        REACT_APP_GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID,
    },
};

module.exports = withCSS(withBundleAnalyzer(config));
