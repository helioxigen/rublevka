function formatSearchValue(str) {
  const stringWithoutWhitespaces = str.replace(/\s+/g, '');

  return stringWithoutWhitespaces
    .split(/,+/)
    .filter(Boolean)
    .join(',');
}

export default function getItemsFromAPI(searchValue) {
  const formattedSearchValue = formatSearchValue(searchValue);

  const params = new URLSearchParams({
    'filter[id]': formattedSearchValue,
    'pagination[limit]': 256,
  });

  return fetch(`https://api.jqestate.ru/v1/properties/country?${params}`, {
    method: 'GET',
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Fetch error'));
  });
}
