import { API } from 'core/config/sources';

import { throwFormattedError } from 'core/fetcher2/helpers';

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

export const createElement = (resource, data) => {
  if (!resource) throwFormattedError('required', resource);

  return API.post(resource, data).then(
    ({ headers }) => {
      const locationParts = headers.location.split('/');
      const id = locationParts[locationParts.length - 1];

      return Promise.resolve({ id });
    },
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
