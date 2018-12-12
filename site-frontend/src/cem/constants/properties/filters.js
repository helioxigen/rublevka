export const defaultFilter = {
  initial: { 'saleOffer.isResale': 'false' },
  resale: {},
  removed: {
    state: 'deleted',
  },
  all: {},
};

export const defaultFilterNot = {
  initial: {
    state: 'deleted',
  },
  resale: {
    'saleOffer.isResale': 'false',
    state: 'deleted',
  },
  removed: {},
  all: {},
};
