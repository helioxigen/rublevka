import { query } from '@utils';
import config from '@config';

require('isomorphic-fetch');

export const instance = async (apiPath, params) => {
    const response = await fetch(
        `${config.resource.API_ENDPOINT}/${apiPath}${params ? `?${encodeURI(query.get(params))}` : ''}`,
        {
            method: 'GET',
            // cache: 'no-store',
            // headers: {
            //     pragma: 'no-cache',
            //     'cache-control': 'no-cache',
            // },
        }
    );

    if (response.ok) {
        const json = await response.json();

        return json;
    }

    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
};

// export const getCountryProperties = (pagination, filter) => instance('properties/country', { pagination, filter });
