/* eslint-disable */
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

export function recursiveJSONToQS(object, prevKey) {
  if (object) {
    return Object.keys(object)
      .map(key => {
        const value = object[key];

        if (key && (value || (Array.isArray(value) && value.length))) {
          if (
            value instanceof Object &&
            !(value instanceof Array) &&
            !(value instanceof Function)
          ) {
            return recursiveJSONToQS(value, key);
          }
          if (prevKey) {
            return `${prevKey}[${key}]=${value}`;
          }
          return `${key}=${value}`;
        }
        return null;
      })
      .filter(item => !!item)
      .join('&');
  }

  return null;
}

export function recursiveCleanUp(input) {
  const obj = { ...input };

  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (value === undefined) delete obj[key];
    if (value === null) delete obj[key];
    if (typeof value === 'string' && value.length === 0) delete obj[key];

    if (
      value instanceof Object &&
      !(value instanceof Array) &&
      !(value instanceof Function)
    ) {
      if (Object.keys(recursiveCleanUp(value)).length === 0) {
        delete obj[key];
      } else {
        obj[key] = recursiveCleanUp(value);
      }
    }
  });

  return obj;
}

export const makeFilterRange = (min, max, multiplier = 1) => {
  const hasNotMin =
    min === 'min' ||
    min === undefined ||
    min === null ||
    typeof min === 'undefined' ||
    typeof min === 'null';

  const hasNotMax =
    max === 'max' ||
    max === undefined ||
    max === null ||
    typeof max === 'undefined' ||
    typeof max === 'null';

  const from = !hasNotMin ? Number(min) * multiplier : '';
  const to = !hasNotMax ? Number(max) * multiplier : '';

  return from || to ? `${from}..${to}` : null;
};
