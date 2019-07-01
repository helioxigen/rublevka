import getConfig from 'next/config';

const { API_ENDPOINT: API_URL, APP_ENV } = getConfig().publicRuntimeConfig;

const envs = {
    production: {
        API: API_URL || 'https://api.jqestate.ru',
        CDN: 'https://images.jqestate.ru',
    },
    development: {
        API: API_URL || 'https://api-dev.jqestate.ru',
        CDN: 'https://images.jqestate.ru',
    },
    local: {
        API: API_URL || '/api-dev',
        CDN: 'https://images.jqestate.ru',
    },
};

export const { API: API_ENDPOINT, CDN } = envs[APP_ENV];
