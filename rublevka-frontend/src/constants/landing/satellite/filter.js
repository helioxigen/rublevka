import global from 'window-or-global';

export const stateFilter = {
  sale: ['public', 'rented'],
  rent: 'public',
};

export const defaultFilter = offerKind => ({
  state: stateFilter[offerKind],
  [`${offerKind}Offer.multiCurrencyPrice.usd`]: '0..',
  'location.routeId':
    global.config.routes && global.config.routes.map(route => route.id),
});

export const defaultFilterNot = {
  'saleOffer.isResale': 'false',
};

export const slider = {
  sale: value => ({
    min: 0,
    max: 31,
    step: 1,
    value: {
      min: value.min,
      max: value.max,
    },
    valueFormat: {
      prefix: '$',
      postfix: 'млн',
      max: '30+',
    },
  }),
  rent: value => ({
    min: 0,
    max: 100,
    step: 1,
    value: {
      min: value.min,
      max: value.max,
    },
    valueFormat: {
      prefix: '$',
      postfix: 'тыс',
      max: '100+',
    },
  }),
};
