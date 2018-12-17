import { validateTaskForm, validateDocumentForm } from 'cem/validators/tasks';

export const fields = [
  'kind',
  'state',
  'deadline.date',
  'deadline.time',
  'deadline.utcOffset',
  'result',
  'responsibleUser.id',

  'contactDetails.goal',
  'contactDetails.linkKind',

  'contactDetails.contactId',

  'contactDetails.propertyId',
  'contactDetails.propertyCategory',

  'contactDetails.clientLeadId',

  'contactDetails.dealId',

  'previewDetails.propertyId',
  'previewDetails.propertyCategory',
  'previewDetails.contactId',
  'previewDetails.dealId',
  'previewDetails.archivedDocumentId',

  'negotiationDetails.propertyId',
  'negotiationDetails.propertyCategory',
  'negotiationDetails.contactId',
  'negotiationDetails.dealId',
  'negotiationDetails.archivedDocumentId',

  'freeDetails.goal',
  'freeDetails.linkKind',
  'freeDetails.propertyId',
  'freeDetails.propertyCategory',
  'freeDetails.dealId',
  'freeDetails.clientLeadId',
  'freeDetails.contactId',
];

export const documentFormSettings = {
  form: 'taskDocument',
  fields: ['file'],
  validate: validateDocumentForm,
};

export const taskFormSettings = {
  form: 'task',
  destroyOnUnmount: true,
  validate: validateTaskForm,
};

export const previewPropertiesLimit = 1;
