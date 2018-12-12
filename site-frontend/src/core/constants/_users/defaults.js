export const defaultQueryParamsByGroup = {
  all: {
    filter: {
      'details.member': 'top_manager',
    },
  },

  cityDepartment: {
    filter: {
      'details.departmentId': 6,
      'details.member': 'agent',
      pagination: { limit: 256 },
    },
  },

  countryDepartment: {
    filter: {
      'details.departmentId': 3,
      'details.member': 'agent',
      pagination: { limit: 256 },
    },
  },
};
