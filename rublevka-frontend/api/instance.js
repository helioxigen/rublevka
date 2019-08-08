import { query } from '@utils';
import config from '@config';

require('isomorphic-fetch');

export const instance = (apiPath, params) =>
    fetch(`${config.resource.API_ENDPOINT}/${apiPath}${params ? `?${encodeURI(query.get(params))}` : ''}`, {
        method: 'GET',
        cache: 'no-cache',
    }).then(r => {
        if (!r.ok) {
            throw new Error(r.statusText);

            // throw new Error(r.statusText);
        }
        // if (r.status === 404) {
        //     throw new Error(r.status);
        // }

        return r.json();
    });

// export const getCountryProperties = (pagination, filter) => instance('properties/country', { pagination, filter });
