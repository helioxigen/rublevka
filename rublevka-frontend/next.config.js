/* eslint-disable */
path = require('path');

module.exports = {
    useFileSystemPublicRoutes: false,
    distDir: `build/${process.env.HOST}`,
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

        const jsconfigPaths = require('./jsconfig.json').compilerOptions.paths;

        Object.keys(jsconfigPaths)
            .filter(k => k.search('/*') !== -1)
            .forEach(key => {
                config.resolve.alias[key] = path.resolve(__dirname, jsconfigPaths[key][0]);
            });

        return config;
    },
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
        APP: process.env.APP || 'rublevka',
        APP_ENV: process.env.APP_ENV,
    },
};
