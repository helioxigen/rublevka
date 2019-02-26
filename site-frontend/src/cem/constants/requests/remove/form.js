import validate from 'cem/validators/removalRequests';

const fields = [
  'kind',
  'note',
  'propertyId',
  'propertyCategory',
  'originalPropertyId',
];

export default {
  form: 'removalRequest',
  fields,
  validate,
};
