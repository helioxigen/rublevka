import validate from 'cem/validators/selections';

const fields = [
  'id',
  'name',
  'site',
  'propertyCategory',
  'propertyIds',
  'responsibleUserId',
  'createdByUserId',
  'pages',
  'state',
  'description',
  'title',
  'offerKind',
];

export const formSettings = {
  form: 'selection',
  destroyOnUnmount: false,
  fields,
  validate,
};
