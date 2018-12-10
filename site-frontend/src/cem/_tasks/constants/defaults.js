import { getDateLimits } from 'core/helpers';

export const resourceName = '_tasks';
export const apiPath = '/v1/tasks';

const groups = {
  to_do: {
    filter: {
      state: 'to_do',
    },
  },
  done: {
    filter: {
      state: 'done',
    },
  },
  canceled: {
    filter: {
      state: 'canceled',
    },
  },
  overdue: {
    filter: {
      state: 'to_do',
      deadlineTo: getDateLimits(new Date(), 'start'),
    },
    orderBy: {
      field: 'deadline',
      predicate: 'asc',
    },
  },
  today_tomorrow: {
    filter: {
      state: 'to_do',
      deadlineFrom: getDateLimits(new Date(), 'start'),
      deadlineTo: getDateLimits(new Date(), 'end', 1),
    },
    orderBy: {
      field: 'deadline',
      predicate: 'asc',
    },
  },
};

export const getDefaultsByGroup = (group, options) => {
  if (options.contactId) {
    return {
      filter: {
        contactId: options.contactId,
      },
    };
  } else if (options.clientLeadId) {
    return {
      filter: {
        clientLeadId: options.clientLeadId,
      },
    };
  }
  return groups[group] || {};
};

export const titles = {
  all: 'Все задачи',
  to_do: 'Задачи в ожидании',
  done: 'Выполненные задачи',
  canceled: 'Отменённые задачи',
};
