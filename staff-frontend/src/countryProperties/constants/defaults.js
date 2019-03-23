import { dealTypes, placesToPlaceId } from './dictionaries';

export const resourceName = 'countryProperties';
export const apiPath = '/v1/properties/country';

export const getApiPathByGroup = (group, options) => {
  if (group === 'similar') {
    return `/v1/properties/country/${options.id}/similar/${
      dealTypes[options.dealType]
    }`;
  }

  return '/v1/properties/country';
};

export const initialElementScheme = {
  location: {},
  communication: {},
  rentOffer: {},
  saleOffer: {},
  additionalDetails: {},
  responsibleUser: {},
  specification: {
    layouts: {},
  },
  landDetails: {},
  images: [],
  layoutImages: [],
};

const defaultParamsByGroup = {
  all: {
    pagination: {
      limit: 48,
    },
  },
  sale: {
    filter: {
      state: ['public', 'rented'],
      routes: [],
      isResale: 'true',
      salePrice: '0..',
    },
    pagination: {
      limit: 22,
    },
    filterNot: { isSaleDisabled: true },
  },
  rent: {
    filter: {
      state: ['public'],
      routes: [],
      // isResale: `true`,
      rentPrice: '0..',
    },
    pagination: {
      limit: 22,
    },
    filterNot: {
      isRentDisabled: true,
    },
  },
  forLandingBySettlements: {
    filter: {
      state: ['public', 'rented'],
      isResale: 'true',
      salePrice: '0..',
    },
    pagination: {
      limit: 8,
    },
    filterNot: {
      isSaleDisabled: true,
    },
  },
  forSettlementOnlyPrimary: {
    filter: {
      state: ['public'],
      isResale: 'false',
      salePrice: '0..',
    },
    pagination: {
      limit: 7,
    },
  },
  forSettlementSale: {
    filter: {
      state: ['public'],
      isResale: 'true',
      salePrice: '0..',
    },
    pagination: {
      limit: 19,
    },
    filterNot: {
      isSaleDisabled: true,
    },
  },
  forSettlementRent: {
    filter: {
      state: ['public'],
      rentPrice: '0..',
    },
    pagination: {
      limit: 19,
    },
    filterNot: {
      isRentDisabled: true,
    },
  },
  forSettlementLanding: {
    filter: {
      state: ['public'],
      salePrice: '0..',
    },
    pagination: {
      limit: 24,
    },
    orderBy: {
      field: 'kind',
      predicate: 'asc',
    },
    filterNot: {
      isSaleDisabled: true,
    },
  },
  forSelections: {
    pagination: {
      limit: 31,
    },
  },
  total: {
    filter: {
      state: ['public', 'rented'],
      routes: [],
    },
    pagination: {
      limit: 1, // we don't need items for counter
    },
  },
};

export const getDefaultsByGroup = (group, options) => {
  if (group === 'byContactId') {
    return {
      filter: {
        'contactDetails.id': options.contactId,
      },
    };
  }

  if (group === 'forLandingBySettlements') {
    return {
      ...defaultParamsByGroup.sale,
      pagination: {
        ...defaultParamsByGroup.sale.pagination,
        limit: 3,
      },
    };
  }

  if (
    group === 'forSettlementOnlyPrimary'
    || group === 'forSettlementSale'
    || group === 'forSettlementRent'
    || group === 'forSettlementLanding'
  ) {
    return {
      ...defaultParamsByGroup[group],
      filter: {
        ...defaultParamsByGroup[group].filter,
        settlementId: options.settlementId,
      },
    };
  }

  if (group === 'forPlaceSale' || group === 'forPlaceRent') {
    const placeId = placesToPlaceId[options.placeKind];

    return {
      ...defaultParamsByGroup[options.dealType],
      filter: {
        ...defaultParamsByGroup[options.dealType].filter,
        [placeId]: options.placeId,
      },
    };
  }

  return defaultParamsByGroup[group];
};
