const contactFields = [
  'firstName',
  'lastName',
  'phoneNumber',
  'email',
  'kindId',
];

const phoneCallFields = [
  'status',
  'duration',
  'callRecording',
];


export default [
  'state', 'stateReason', 'stateToApprove',
  'responsibleUserId',
  'clientLeadSourceId',
  'note', 'utms',
  'kind', 'requestKind',
  'toggle', 'state',
  ...contactFields.map(field => `contactDetails.${field}`),
  ...phoneCallFields.map(field => `phoneCallDetails.${field}`),
];
