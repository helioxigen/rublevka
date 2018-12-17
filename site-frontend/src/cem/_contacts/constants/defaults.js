const defaultQueryParamsByGroup = {
  all: {},
  archive: {},
};

export const makeDefaultQueryParamsByGroup = (group, options = {}) =>
  // if (options.contactId) {
  //   return {
  //     [`byContactId_${options.contactId}`]: { // TODO: we have that hack because fetcher goes here from core/fetcher/helpers/mapDefaultParams
  //       filter: {
  //         'contactDetails.id': options.contactId,
  //       },
  //     },
  //   };
  // } else {
  defaultQueryParamsByGroup;
// }

export const resourceName = '_contacts';
export const apiPath = '/v1/contacts';
