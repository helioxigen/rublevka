import { API } from 'core/config/sources';

import { throwFormattedError } from 'core/fetcher2/helpers';

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

export const updateElement = (resource, id, data) => {
  if (!resource) throwFormattedError('required', resource);
  if (!id) throwFormattedError('required', id);

  return API.put(`${resource}/${id}`, data)
    .then(
      () => Promise.resolve(data),
      ({ body: { errors } }) => Promise.reject(errors),
    );
};
