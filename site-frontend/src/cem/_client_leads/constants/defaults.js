export const resourceName = '_client_leads';
export const apiPath = '/v1/client_leads';
export const apiPathByGroup = {
  default: apiPath,
  forArchivedContact: '/v1/client_leads/archive',
};

export const titles = {
  active: 'Активные лиды',
  processed: 'Обработанные лиды',
  rejected: 'Отклонённые лиды',
  spam: 'Спам',
};

const defaultParamsByGroup = {
  default: {},
  active: {
    filter: {
      state: ['new', 'in_progress'],
    },
  },
  processed: {
    filter: {
      state: ['processed'],
    },
  },
  rejected: {
    filter: {
      state: ['rejected'],
    },
  },
  spam: {
    filter: {
      state: ['spam'],
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
