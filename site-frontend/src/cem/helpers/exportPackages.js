const stringFields = ['category', 'isResale'];

const getInitialField = (fieldName, key, filter = {}) => {
  if (fieldName === 'saleOffer.price') {
    return { saleOffer: { price: filter[key] } };
  } else if (fieldName === 'rentOffer.price') {
    return { rentOffer: { price: filter[key] } };
  } else if (fieldName === 'location.settlementId') {
    return {
      location: {
        settlementId: (filter[key] && filter[key].split(',').map(id => Number(id))) || [],
      },
    };
  }
  return {
    [fieldName]:
      stringFields.indexOf(fieldName) > -1
        ? filter[key]
        : (filter[key] && filter[key].split(',')) || [],
  };
};

export const prepareInitialValues = ({ filter = {}, ...data }) => ({
  ...data,
  ...Object.keys(filter).reduce(
    (result, key) => {
      const resultKey = key.split('[')[0]; // 'filter' or 'filterNot'
      const fieldMatch = key.match(/.*\[(.*)\].*/m);

      if (!fieldMatch) return result;

      const fieldName = key.match(/.*\[(.*)\].*/m)[1];

      return {
        ...result,
        [resultKey]: {
          ...result[resultKey],
          ...getInitialField(fieldName, key, filter),
        },
      };
    },
    { filter: {}, filterNot: {} },
  ),
});

const getRequestValueForFilterField = (key, filter = {}) => {
  if (key === 'saleOffer') {
    return { 'filter[saleOffer.price]': filter[key].price };
  } else if (key === 'rentOffer') {
    return { 'filter[rentOffer.price]': filter[key].price };
  } else if (key === 'location') {
    return {
      'filter[location.settlementId]':
        filter[key].settlementId && filter[key].settlementId.join(','),
    };
  }
  return {
    [`filter[${key}]`]: Array.isArray(filter[key]) ? filter[key].join(',') : filter[key],
  };
};

export const transformRequestValues = ({ filter = {}, filterNot = {}, ...values }) => ({
  ...values,
  filter: {
    ...Object.keys(filter).reduce(
      (result, key) => ({
        ...result,
        ...getRequestValueForFilterField(key, filter),
      }),
      {},
    ),
    ...Object.keys(filterNot).reduce(
      (result, key) => ({
        ...result,
        ...(key === 'location'
          ? {
            'filterNot[location.settlementId]':
                filterNot[key].settlementId && filterNot[key].settlementId.join(','),
          }
          : {
            [`filterNot[${key}]`]: Array.isArray(filterNot[key])
                ? filterNot[key].join(',')
                : filterNot[key],
          }),
      }),
      {},
    ),
  },
});
