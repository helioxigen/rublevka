export const resourceName = '_users';
export const apiPath = '/v1/users/staff';

const groups = {};

export const getDefaultsByGroup = (group, options) => groups[group] || {};

export const titles = {};
