export const resourceName = 'cityProperties';
import { dealTypes } from 'core/cityProperties/constants/dictionaries';

export const apiPath = '/v1/properties/city';

export const getApiPathByGroup = (group, options) => {
  if (group === 'similar') {
    return `/v1/properties/city/${options.id}/similar/${
      dealTypes[options.dealType]
    }`;
  }

  return '/v1/properties/city';
};

const defaultParamsByGroup = {
  sale: {
    filter: {
      state: ['public', 'rented'],
      isResale: 'true',
      salePrice: {
        min: 0.000001,
      },
    },
    orderBy: {
      field: 'saleOffer.multiCurrencyPrice.usd',
      predicate: 'desc',
    },
    pagination: {
      limit: 33,
    },
  },
  rent: {
    filter: {
      state: ['public'],
      rentPrice: {
        min: 0.001,
      },
      // isResale: `true`,
    },
    orderBy: {
      field: 'rentOffer.multiCurrencyPrice.usd',
      predicate: 'desc',
    },
    pagination: {
      limit: 33,
    },
  },
  topForLanding: {
    filter: {
      id: [11341, 11232, 11768, 18, 11514, 9],
    },
  },
  forComplexOnlyPrimary: {
    filter: {
      state: ['public'],
      isResale: 'false',
    },
    filterNot: {
      'rentOffer.price': '0..',
    },
    pagination: {
      limit: 6,
    },
  },
  forSelections: {
    pagination: {
      limit: 31,
    },
  },
};

export const getDefaultsByGroup = (group, options) => {
  if (group === 'forComplexOnlyPrimary') {
    return {
      ...defaultParamsByGroup[group],
      filter: {
        ...defaultParamsByGroup[group].filter,
        complexId: options.complexId,
      },
    };
  }

  return defaultParamsByGroup[group];
};
