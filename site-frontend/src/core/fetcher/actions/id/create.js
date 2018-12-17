import { API } from 'core/config/sources';

import apiPaths from 'core/fetcher/constants/apiPaths';
import { throwFormattedError } from 'core/fetcher/helpers';

export const createElementStarted = type => ({
  type,
});

export const createElementSucceeded = (type, id) => ({
  type,
  id,
});

export const createElementFailed = (type, errors) => ({
  type,
  errors,
});

export const createElement = (resourceName, data) => {
  if (!resourceName) throwFormattedError('required', resourceName);
  if (!apiPaths[resourceName]) throwFormattedError('apiPathEmpty', resourceName);

  return API.post(apiPaths[resourceName], data).then(
    ({ headers }) => {
      const locationParts = headers.location.split('/');
      const id = locationParts[locationParts.length - 1];

      return Promise.resolve({ id });
    },
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
