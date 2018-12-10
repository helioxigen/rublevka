import validate from 'cem/_tasks/helpers/validate';

export const fields = [
  'id',
  'kind',
  'state',
  'result',
  'resultId',
  'responsibleUserId',
  'reportedByUserId',

  'stateDetails.toApprove',

  '_deadline.date',
  '_deadline.time',
  '_deadline.utcOffset',

  '_details.goal',
  '_details.goalId',
  '_details.linkKind',

  '_details.contactId',
  '_details.clientLeadId',
  '_details.dealId',

  '_details.propertyId',
  '_details.propertyCategory',

  '_details.objects[].objectId',
  '_details.objects[].objectKlass',
  '_details.objects[].note',
  '_details.objects[].state', // Enum[`pending`, `viewed`, `rejected`]
  '_details.objects[].resultId',

  '_details.archivedDocumentId',

  '_details.confirmation',
  '_details.confirmationAt',
];

// export const documentFormSettings = {
//   form: `taskDocument`,
//   fields: [
//     `file`,
//   ],
//   validate: validateDocumentForm,
// };

export const formSettings = {
  form: 'task',
  // destroyOnUnmount: false,
  validate,
  fields,
};
