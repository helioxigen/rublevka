export const resourceName = 'client_leads';

export const titles = {
  active: 'Активные лиды',
  processed: 'Обработанные лиды',
  rejected: 'Отклонённые лиды',
  spam: 'Спам',
};

export const defaultQueryParamsByGroup = {
  all: {
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
