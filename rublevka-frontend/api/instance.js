import { query } from '@utils';
import config from '@config';

require('isomorphic-fetch');

export const instance = (apiPath, params) =>
    fetch(`${config.resource.API_ENDPOINT}/${apiPath}${params ? `?${encodeURI(query.get(params))}` : ''}`, {
        method: 'GET',
        cache: 'no-cache',
    }).then(r => r.json());

// export const getCountryProperties = (pagination, filter) => instance('properties/country', { pagination, filter });
