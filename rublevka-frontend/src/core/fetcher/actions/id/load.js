import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher/constants/apiPaths';
import { throwFormattedError } from 'core/fetcher/helpers';

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

export const loadElement = (resourceName, id) => {
  if (!resourceName) throwFormattedError('required', resourceName);
  if (!id) throwFormattedError('required', id);
  if (!apiPaths[resourceName]) {
    throwFormattedError('apiPathEmpty', resourceName);
  }

  return API.get(`${apiPaths[resourceName]}/${id}`).then(
    ({ body }) => Promise.resolve(body),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
