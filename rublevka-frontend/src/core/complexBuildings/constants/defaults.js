export const resourceName = 'complexBuildings';
export const apiPath = '/v1/complex_buildings';

const defaultParamsByGroup = {
  forComplex: {
    filter: {
      state: 'public',
    },
  },
};

export const getDefaultsByGroup = (group, options) =>
  defaultParamsByGroup[group] || {};
