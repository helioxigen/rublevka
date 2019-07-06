const envs = {
    production: {
        API: process.env.API_URL || 'https://api.jqestate.ru',
        CDN: 'https://images.jqestate.ru',
    },
    development: {
        API: process.env.API_URL || 'https://api-dev.jqestate.ru',
        CDN: 'https://images.jqestate.ru',
    },
    local: {
        API: process.env.API_URL || '/api-dev',
        CDN: 'https://images.jqestate.ru',
    },
};

export const { API: API_ENDPOINT, CDN } = envs[process.env.APP_ENV];
