import validate from 'cem/validators/contacts';

const formFields = [
  'id',
  'photo',
  'kind',
  'details.firstName',
  'details.middleName',
  'details.lastName',
  'details.email',
  'details.phoneNumber',
  'details.twitter',
  'details.facebook',
  'details.instagram',
  'details.vk',
  'details.photo',
  'additionalDetails.additionalPhoneNumber',
  'additionalDetails.additionalEmail',
  'additionalDetails.occupationId',
  'additionalDetails.jobRoleId',
  'additionalDetails.autoBrandId',
  'additionalDetails.autoModelId',
  'additionalDetails.autoNumber',
  'additionalDetails.autoRegion',
  'companyDetails.companyId',
  'companyDetails.positionId',
  'note',
];

export const formSettings = {
  form: 'contact',
  fields: formFields,
  destroyOnUnmount: false,
  validate,
};
