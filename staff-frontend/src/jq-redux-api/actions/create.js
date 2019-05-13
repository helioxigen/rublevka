import { post } from '../api';
import { throwFormattedError } from '../helpers';

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

  return post(resource, data).then(
    async (result) => {
      const { id } = result;
      return Promise.resolve({ id });
    },
    ({ body: { errors } }) => Promise.reject(errors),
  );
};
