const _ = require('lodash');
const path = require('path');

module.exports = {
    resolve: {
        alias: _.mapValues(
            {
                '@utils': './utils',
                '@hooks': './utils/hooks',
                '@config': './config',
                '@components': './components',
                '@api': './api',
                '@store': './store',
            },
            val => path.resolve(__dirname, val)
        ),
        extensions: ['.js', '.jsx', '.json'],
    },
};
