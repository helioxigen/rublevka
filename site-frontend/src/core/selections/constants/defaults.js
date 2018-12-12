export const resourceName = 'selections';

export const apiPath = '/v1/properties/selections';

const defaultParamsByGroup = {
  all: {
    filter: {
      state: 'public',
    },
  },
  forIndex: {
    filter: {
      state: 'public',
      pages: ['index'],
    },
  },
};

export const getDefaultsByGroup = (group, options) => defaultParamsByGroup[group] || {};
