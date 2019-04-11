const fetch = require('node-fetch');

const getProperty = id => {
  const url = `https://api.jqestate.ru/v1/properties/country/${id}`;
  return fetch(url, { method: 'GET' });
};

const getImgUrl = (id, size) =>
  `https://images.rublevka.ru/${id}-rublevka-${size}`;

module.exports = { getProperty, getImgUrl };
