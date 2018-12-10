import Filter from '../../filter';

import filterHelper from 'core/decorators/filter';

const fields = [
  'id',
  'contactDetails.id',
  'contactDetails.phoneNumber',
  'contactDetails.email',
];

const extendedFields = [
  'responsibleUser.departmentId',
  'responsibleUser.divisionId',
  'responsibleUser.id',
];

export default filterHelper('unsuccessfulDeals', fields, extendedFields)(Filter);
