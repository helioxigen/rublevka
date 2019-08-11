const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 256;

require('isomorphic-fetch');

function encodeQueryData(params) {
    const query = [];
    Object.keys(params).forEach(key => {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    });
    return query.join('&');
}

function paginate(resource, routes, customParams, offset, limit, totalItems, resolve, reject) {
    const params = {
        'filter[location.routeId]': routes.join(','),
        'pagination[limit]': limit,
        'pagination[offset]': offset,
        ...customParams,
    };

    const querystring = encodeQueryData(params);
    const url = `${process.env.API_ENDPOINT || 'https://api.jqestate.ru'}${resource}?${querystring}`;

    fetch(url)
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        })
        .then(({ pagination, items }) => {
            const allItems = totalItems.concat(items);
            if (pagination.total > pagination.offset + pagination.limit) {
                const newOffset = pagination.offset + pagination.limit;

                paginate(resource, routes, customParams, newOffset, limit, allItems, resolve, reject);
            } else {
                resolve(allItems);
            }
        })
        .catch(reject);
}

function getItems(resource, routes, params = {}, offset = DEFAULT_OFFSET, limit = DEFAULT_LIMIT) {
    return new Promise((resolve, reject) => {
        paginate(resource, routes, params, offset, limit, [], resolve, reject);
    }).catch(error => {
        console.log(error); // Error: Not Found
    });
}

module.exports = getItems;
