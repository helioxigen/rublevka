import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher/constants/apiPaths';
import { throwFormattedError } from 'core/fetcher/helpers';

export const updateElementStarted = (type, id) => ({
  type,
  id,
});

export const updateElementSucceeded = (type, id) => ({
  type,
  id,
});

export const updateElementFailed = (type, id, errors) => ({
  type,
  id,
  errors,
});

export const updateElement = (resourceName, id, data) => {
  if (!resourceName) throwFormattedError('required', resourceName);
  if (!id) throwFormattedError('required', id);
  if (!apiPaths[resourceName]) throwFormattedError('apiPathEmpty', resourceName);

  return API.put(`${apiPaths[resourceName]}/${id}`, data).then(
    () => Promise.resolve(data),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
