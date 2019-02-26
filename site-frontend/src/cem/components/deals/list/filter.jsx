import Filter from '../filter';

import filterHelper from 'core/decorators/filter';

const fields = ['id', 'cdId', 'cdPhoneNumber', 'state'];

const extendedFields = [
  'ruId',
  'ruDepartmentId',
  'ruDivisionId',

  'tasksDeadlineDate',
  'tasksDoesntHaveScheduled',
  'tasksHasOverdue',

  'expectedFinishAtFrom',
  'expectedFinishAtTo',
];

export default filterHelper('deals', fields, extendedFields)(Filter);
