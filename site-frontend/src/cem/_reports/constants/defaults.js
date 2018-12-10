export const resourceName = '_reports';
export const apiPath = '/v1/reports';

export const apiPathByGroup = {
  funnel: '/v1/reports/funnel/client_leads/departments',
  funnelByDepartmentId: '/v1/reports/funnel/client_leads/staff_users',
};

const groups = {};

export const getDefaultsByGroup = group => groups[group] || {};
