import { makeDateRange, formatFilterDate } from 'core/helpers';
import recursiveCleanUp from 'cem/helpers/recursiveCleanUp';

export const mapParams = ({
  pagination = {},
  orderBy = {},
  filter = {},
  filterNot = {},
}) => {
  const { limit, offset } = pagination;
  const tasksWeightZeroDeadline = filter['tasksWeight.zero.deadline'];

  return recursiveCleanUp({
    pagination: {
      limit,
      offset,
    },
    orderBy,
    filter: {
      id: filter.id,

      'contactDetails.id': filter.contactId,
      'contactDetails.phoneNumber': filter.contactPhoneNumber
        ? `*${filter.contactPhoneNumber}*`
        : undefined,
      'contactDetails.email': filter.contactEmail
        ? `*${filter.contactEmail}*`
        : undefined,

      state: filter.state,

      'responsibleUser.departmentId': filter.ruDepartmentId,
      'responsibleUser.divisionId': filter.ruDivisionId,
      'responsibleUser.id': filter.ruId,

      'details.expectedFinishDateAt': makeDateRange(
        formatFilterDate(filter.expectedFinishDateFrom),
        formatFilterDate(filter.expectedFinishDateTo),
      ),

      'tasksWeight.zero.deadline': formatFilterDate(tasksWeightZeroDeadline),
      'tasksWeight.toDo': filter.tasksWeightToDo,
    },
    filterNot,
  });
};
