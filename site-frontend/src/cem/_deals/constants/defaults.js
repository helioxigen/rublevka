export const resourceName = '_deals';
export const apiPath = '/v1/deals';
export const apiPathByGroup = {
  default: apiPath,
  forArchivedContact: '/v1/deals/archive',
};

const defaultParamsByGroup = {
  default: {},
  successful: {
    filter: {
      state: 'successful',
    },
  },
  unsuccessful: {
    filter: {
      state: 'unsuccessful',
    },
  },
};

export const getDefaultsByGroup = (group, options = {}) => {
  if (group === 'forContact' || group === 'forArchivedContact') {
    return {
      filter: {
        contactId: options.contactId,
      },
    };
  }

  return defaultParamsByGroup[group] || defaultParamsByGroup.default;
};

export const titles = {
  successful: 'Состоявшиеся сделки',
  unsuccessful: 'Незаключённые сделки',
};
