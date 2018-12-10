import notifications from './notifications/list';

export const fields = [
  'id',
  'photo',

  'firstName',
  'middleName',
  'lastName',

  'password',
  'workPhoneNumber',
  'email',

  'personalPhoneNumber',
  'personalEmail',

  'details.startedWorkAt',
  'details.finishedWorkAt',
  'details.departmentId',
  'details.roleId',
  'details.divisionId',
  'details.isManager',
  'details.adPhoneNumbers',
  'details.member',
  'details.experienceYears',
  'details.education',
  'details.description',
  'details.isPublic',
  ...notifications.map(item => `details.${item.key}`),
];
