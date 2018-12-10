export const resourceName = 'places';
export const apiPath = '/v1/places';
export const apiPathByGroup = {
  regions: '/v1/places/regions',
  districts: '/v1/places/districts',
  routes: '/v1/places/routes',
  localities: '/v1/places/localities',
  sub_localities: '/v1/places/sub_localities',
};

const defaultParamsByGroup = {
  default: {
    // filter: {
    //   state: `public`,
    // },
  },
};

export const getDefaultsByGroup = (group, options) => defaultParamsByGroup[group] || defaultParamsByGroup.default;
