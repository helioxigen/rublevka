const envs = {
    production: {
        API: 'https://api.jqestate.ru/v1',
        CDN: 'https://images.jqestate.ru',
    },
    development: {
        API: 'https://api.jqestate.ru/v1',
        CDN: 'https://images.jqestate.ru',
    },
    local: {
        API: '/api-dev',
        CDN: 'https://images.jqestate.ru',
    },
};

export const { API: API_ENDPOINT, CDN } = envs[process.env.APP_ENV || 'development'];
