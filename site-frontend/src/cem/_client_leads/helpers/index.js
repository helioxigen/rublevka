import { makeDateRange, formatFilterDate } from 'core/helpers';
import recursiveCleanUp from 'cem/helpers/recursiveCleanUp';

export const mapParams = ({
  pagination = {},
  orderBy = {},
  filter = {},
  filterNot = {},
}) => {
  const {
    createdAtFrom,
    createdAtTo,
    awaitingApproval,
    notAwaitingApproval,
  } = filter;
  const { limit, offset } = pagination;

  const {
    tasksDeadlineDate,
    tasksDoesntHaveScheduled,
    tasksHasOverdue,
  } = filter;

  return recursiveCleanUp({
    pagination: {
      limit,
      offset,
    },
    orderBy,
    filter: {
      id: filter.id,
      kind: filter.kind,
      'requestDetails.requestKind': filter.requestKind,
      state: filter.state,

      'contactDetails.phoneNumber': filter.phoneNumber
        ? `*${filter.phoneNumber}*`
        : undefined,
      contactId: filter.contactId,

      clientLeadSourceId: filter.clientLeadSourceId,

      'createdByUser.id': filter.cuId,
      'createdByUser.departmentId': filter.cuDepartmentId,
      'createdByUser.divisionId': filter.cuDivisionId,

      'responsibleUser.id': filter.ruId,
      'responsibleUser.departmentId': filter.ruDepartmentId,
      'responsibleUser.divisionId': filter.ruDivisionId,

      'tasks.deadline': formatFilterDate(tasksDeadlineDate),
      'tasks.scheduled': tasksDoesntHaveScheduled ? 'false' : undefined,
      'tasks.overdue': tasksHasOverdue,

      createdAt: makeDateRange(
        formatFilterDate(createdAtFrom),
        formatFilterDate(createdAtTo),
      ),

      ...(awaitingApproval
        ? { 'stateDetails.toApprove': 'spam,processed,rejected' }
        : {}),
    },
    filterNot: {
      ...(notAwaitingApproval
        ? { 'stateDetails.toApprove': 'spam,processed,rejected' }
        : {}),
    },
  });
};
