import * as dict from 'cem/constants/leads/dictionaries';

export const getLeadDescription = (leadKind, requestKind) =>
  !leadKind
    ? ''
    : `${dict.leadKinds[leadKind].title} ${
        !requestKind ? dict.requestKinds[requestKind].title.toLowerCase() : ''
      }`;

export const mapListFilter = (filter = {}, kind) => {
  const filters = {
    noTasks: {
      filter: {
        state: 'in_progress',
        'tasksWeight.toDo': '0',
      },
      filterNot: {
        'stateDetails.toApprove': ['spam', 'processed', 'rejected'],
      },
    },
    new: {
      filter: {
        state: 'new',
      },
    },
  };

  return filters[kind];
};
