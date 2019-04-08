import { API } from 'core/config/sources';

import { throwFormattedError } from 'core/fetcher2/helpers';

export const loadElementStarted = (type, id) => ({
  type,
  id,
});

export const loadElementSucceeded = (type, id, data) => ({
  type,
  id,
  data,
});

export const loadElementFailed = (type, id, errors) => ({
  type,
  id,
  errors,
});

export const loadElement = (apiPath, id) => {
  if (!apiPath) throwFormattedError('required', 'apiPath');

  return API.get(`${apiPath}/${id}`).then(
    ({ body }) => Promise.resolve(body),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
