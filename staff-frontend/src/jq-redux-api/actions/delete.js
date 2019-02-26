import { del } from '../api';

import { throwFormattedError } from '../helpers';

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

  return del(`${resource}/${id}`).then(
    () => Promise.resolve(data),
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
