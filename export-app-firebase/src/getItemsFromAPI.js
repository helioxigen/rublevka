const fetch = require('node-fetch');
const URLSearchParams = require('@ungap/url-search-params');

function getItemsFromAPI(searchValue) {
  const params = new URLSearchParams({
    'filter[id]': searchValue,
    'filter[state]': 'public',
    'pagination[limit]': 256,
    cachereset: Math.random().toString().slice(2),
  });

  return fetch(`https://api.jqestate.ru/v1/properties/country?${params}`, {
    method: 'GET',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
}

exports.getItemsFromAPI = getItemsFromAPI;
