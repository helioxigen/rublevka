import validate from 'cem/validators/newsletters';

const fields = [
  'id',
  'name',
  'site',
  'propertyIds',
  'responsibleUserId',
  'createdByUserId',
  'state',
  'description',
  'title',
  'subTitle',
  'offerKind',
  'scheduledAtDate',
  'scheduledAtTime',
  'template',
  'listId',
  'fromTitle',
  'fromEmail',
  '_sendNow',
  '_currency',
];

export const formSettings = {
  form: 'newsletter',
  destroyOnUnmount: true,
  fields,
  validate,
};
