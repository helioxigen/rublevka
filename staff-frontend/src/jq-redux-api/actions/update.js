import { put } from '../api';
import { throwFormattedError } from '../helpers';

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

export function updateElement(resource, id, data) {
  if (!resource) throwFormattedError('required', resource);
  if (!id) throwFormattedError('required', id);
  const res = put(`${resource}/${id}`, data);
  return res;
}
