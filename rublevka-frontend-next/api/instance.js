import { transformToQuery } from '@utils/query';

require('isomorphic-fetch');

const API_URL = `https://api.jqestate.ru/v1`;

export const instance = (apiPath, params) =>
    fetch(`${API_URL}/${apiPath}${params ? `?${transformToQuery(params)}` : ''}`, {
        method: 'GET',
    }).then(r => r.json());

// export const getCountryProperties = (pagination, filter) => instance('properties/country', { pagination, filter });
