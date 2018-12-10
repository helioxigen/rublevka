export const resourceName = 'subLocalities';
export const apiPath = '/v1/sub_locality';

export const getApiPathByGroup = (group) => {
  if (group === 'forProperties') {
    return '/v1/places/sub_localities/items';
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
