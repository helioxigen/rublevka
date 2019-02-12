const directPaths = {
  deals: '/v1/deals',
  _deals: '/v1/deals',
  contacts: '/v1/contacts',
  _contacts: '/v1/contacts',
  usersProfiles: '/v1/users/staff/profiles',
  users: '/v1/users/staff',
  contactsArchive: '/v1/contacts/archive',
  exportPackages: '/v1/export/packages',
  cityProperties: '/v1/properties/city',
  countryProperties: '/v1/properties/country',
  tasks: '/v1/tasks',
  _tasks: '/v1/tasks',
  client_leads: '/v1/client_leads',
  _client_leads: '/v1/client_leads',
  settlements: '/v1/places/settlements',
  selections: '/v1/properties/selections',
  currentDuty: '/v1/daily_duty/current',
};

export const linkedPaths = {
  'exportPackages.errorLogs': id => `/v1/export/packages/${id}/error_logs`,
  'settlements.linkedContacts': id =>
    `/v1/places/settlements/${id}/linked_contacts`,
};

export default {
  ...directPaths,
  ...linkedPaths,
};
