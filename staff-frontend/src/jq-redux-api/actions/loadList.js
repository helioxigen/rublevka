import { get } from '../api';

import { throwFormattedError } from '../helpers';

export const loadListStarted = (type, group, append, params) => ({
  type,
  group,
  append,
  params,
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

export const loadList = (apiPath, group, queryParams) => {
  if (!apiPath) throwFormattedError('required', 'apiPath');
  if (!group) throwFormattedError('required', 'group');

  return get(apiPath, queryParams).then(
    ({ body: { items, pagination } }) => Promise.resolve({ items, pagination }),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
