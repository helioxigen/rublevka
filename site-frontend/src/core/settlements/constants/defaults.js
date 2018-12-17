import global from 'window-or-global';

export const resourceName = 'settlements';
export const apiPath = '/v1/places/settlements';
export const apiPathByGroup = {
  all: '/v1/places/settlements',
  forProperties: '/v1/places/settlements/items',
};

const { routes = [] } = global.config; // TODO check is it ok?

const defaultParamsByGroup = {
  all: {
    filter: {
      state: ['public'],
      routes, // TODO check is it ok?
    },
  },
  forProperties: {
    filter: {
      routes, // TODO check is it ok?
    },
  },
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
  defaultParamsByGroup;
// }

export const getDefaultsByGroup = (group, options) => defaultParamsByGroup[group];

export const cardsListOffset = 120;
export const cardsListAnimationDuration = 300;
