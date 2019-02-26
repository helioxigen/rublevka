import { makeDateRange, formatFilterDate } from 'core/helpers';

export const transformDeal = deal => ({
  ...deal,
  isAgentFixed:
    deal.details && deal.details.expectedAgentFixedPrice ? 'true' : 'false',
});

export const mapFilter = (filter = {}) => {
  const { expectedFinishAtFrom, expectedFinishAtTo } = filter;

  const {
    tasksDeadlineDate,
    tasksDoesntHaveScheduled,
    tasksHasOverdue,
  } = filter;

  return {
    id: filter.id,
    'contactDetails.id': filter.cdId,
    'contactDetails.phoneNumber': filter.cdPhoneNumber
      ? `*${filter.cdPhoneNumber}*`
      : undefined,
    state: filter.state,
    'stateDetails.toApprove': filter['stateDetails.toApprove'],

    'responsibleUser.id': filter.ruId,
    'responsibleUser.departmentId': filter.ruDepartmentId,
    'responsibleUser.divisionId': filter.ruDivisionId,

    'tasks.deadline': formatFilterDate(tasksDeadlineDate),
    'tasks.scheduled': tasksDoesntHaveScheduled ? 'false' : undefined,
    'tasks.overdue': tasksHasOverdue,

    'details.expectedFinishDateAt': makeDateRange(
      formatFilterDate(expectedFinishAtFrom),
      formatFilterDate(expectedFinishAtTo),
    ),
  };
};

export const mapLaneFilterAndFilterNot = (
  filter = {},
  filterNot = {},
  kind,
) => {
  // Handle 'state' filter resetting ('undefined' value is set in this case)
  const state = filter.state === undefined ? kind : filter.state;
  const updatedFilter = { ...filter, state };

  if (kind === 'approval') {
    const { state: stateFilter, ...filterWithoutState } = updatedFilter; // eslint-disable-line no-unused-vars
    const result = {
      filter: mapFilter(filterWithoutState),
      filterNot:
        !!filter.state && filter.state !== 'approval'
          ? {
              ...filterNot,
              'stateDetails.toApprove': 'successful,unsuccessful',
            }
          : filterNot,
    };

    return result;
  }
  return {
    filter: mapFilter(updatedFilter),
    filterNot,
  };
};

export const mapLaneStatsFilter = (filter = {}, laneKey) => {
  if (laneKey === 'approval') {
    const { state: stateFilter, ...filterWithoutState } = filter; // eslint-disable-line no-unused-vars
    return mapFilter(filterWithoutState);
  }
  return mapFilter(filter);
};

export const calculateToApproveAgencyFee = (stats, state, currency) =>
  stats.toApprove[state]
    ? Object.keys(stats.toApprove[state]).reduce(
        (result, key) => result + stats.toApprove[state][key][currency],
        0,
      )
    : 0;

export const mapListFilter = (filter = {}, kind) => {
  const filters = {
    noTasks: {
      filter: {
        'task.schedule': false,
        state: ['presentation', 'negotiation', 'deposit_paid', 'agreement'],
      },
      filterNot: {
        'stateDetails.toApprove': ['successful', 'unsuccessful'],
      },
    },
  };

  return filters[kind];
};
