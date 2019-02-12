import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher/constants/apiPaths';
import { throwFormattedError, mapListQueryParams } from 'core/fetcher/helpers';

export const loadListStarted = (type, group, append) => ({
  type,
  group,
  append,
});

export const loadListSucceeded = (type, group, items, append) => ({
  type,
  group,
  items,
  append,
});

export const loadListFailed = (type, group, errors) => ({
  type,
  group,
  errors,
});

export const loadList = (
  resourceName,
  group,
  { postfix = '', defaultQueryParamsByGroup },
  queryParams,
) => {
  if (!resourceName) throwFormattedError('required', resourceName);
  if (!group) throwFormattedError('required', group);
  if (!defaultQueryParamsByGroup)
    throwFormattedError('required', defaultQueryParamsByGroup);
  if (!apiPaths[resourceName])
    throwFormattedError('apiPathEmpty', resourceName);

  const requestParams = mapListQueryParams(
    defaultQueryParamsByGroup[group],
    queryParams,
  );

  return API.get(`${apiPaths[resourceName]}${postfix}`, requestParams).then(
    ({ body: { items, pagination } }) => Promise.resolve({ items, pagination }),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
