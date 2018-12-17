import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher/constants/apiPaths';
import { throwFormattedError } from 'core/fetcher/helpers';

export const deleteElementStarted = (type, id) => ({
  type,
  id,
});

export const deleteElementSucceeded = (type, id) => ({
  type,
  id,
});

export const deleteElementFailed = (type, id, errors) => ({
  type,
  id,
  errors,
});

export const deleteElement = (resourceName, id, data) => {
  if (!resourceName) throwFormattedError('required', resourceName);
  if (!id) throwFormattedError('required', id);
  if (!apiPaths[resourceName]) throwFormattedError('apiPathEmpty', resourceName);

  return API.del(`${apiPaths[resourceName]}/${id}`).then(
    () => Promise.resolve(data),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
