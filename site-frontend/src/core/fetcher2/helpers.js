export const mergeParams = (
  defaults = {},
  { filter, filterNot, pagination, orderBy, ...restParams } = {},
) => ({
  ...defaults,
  filter: {
    ...defaults.filter,
    ...filter,
  },
  filterNot: {
    ...defaults.filterNot,
    ...filterNot,
  },
  pagination: {
    ...defaults.pagination,
    ...pagination,
  },
  orderBy: {
    ...defaults.orderBy,
    ...orderBy,
  },
  ...restParams,
});

export const throwFormattedError = (kind, ...args) => {
  switch (kind) {
    case 'required': {
      let argIndex = 0;
      throw new Error(
        '[fetcher] Required field %s is empty'.replace(
          /%s/g,
          () => args[argIndex++],
        ),
      );
    }
    case 'apiPathEmpty': {
      let argIndex = 0;
      throw new Error(
        '[fetcher] Resource name %s must be in constants/apiPaths'.replace(
          /%s/g,
          () => args[argIndex++],
        ),
      );
    }
    default: {
      throw new Error('[fetcher] Unrecognized error');
    }
  }
};
