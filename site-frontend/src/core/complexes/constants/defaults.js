export const resourceName = 'complexes';
export const apiPath = '/v1/complexes';

export const getApiPathByGroup = (group) => {
  if (group === 'forProperties') {
    return '/v1/complexes/items';
  }

  return apiPath;
};

const defaultParamsByGroup = {
  list: {
    filter: {
      state: 'public',
    },
    pagination: {
      limit: 5,
    },
  },
};

export const getDefaultsByGroup = (group, options) => defaultParamsByGroup[group] || {};
