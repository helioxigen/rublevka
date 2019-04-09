export const resourceName = 'users';
export const apiPath = '/v1/users/staff';
export const apiPathByGroup = {
  all: '/v1/users/staff',

  tops: '/v1/users/staff/profiles',
  countryDepartment: '/v1/users/staff/profiles',
  cityDepartment: '/v1/users/staff/profiles',
};

const defaultParamsByGroup = {
  tops: {
    filter: {
      'details.member': 'top_manager',
    },
  },
  countryDepartment: {
    filter: {
      'details.departmentId': 3,
      'details.member': 'agent',
    },
    pagination: {
      limit: 256,
    },
  },
  cityDepartment: {
    filter: {
      'details.departmentId': 6,
      'details.member': 'agent',
    },
    pagination: {
      limit: 256,
    },
  },
};

export const getDefaultsByGroup = (group, options) =>
  // if (group === `byContactId`) {
  //   return {
  //     filter: {
  //       'contactDetails.id': options.contactId,
  //     },
  //   };
  // }

  defaultParamsByGroup[group];
