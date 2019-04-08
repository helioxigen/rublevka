import { API } from 'core/config/sources';

import { throwFormattedError } from 'core/fetcher2/helpers';

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

export const deleteElement = (resource, id, data) => {
  if (!resource) throwFormattedError('required', resource);
  if (!id) throwFormattedError('required', id);

  return API.del(`${resource}/${id}`).then(
    () => Promise.resolve(data),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
