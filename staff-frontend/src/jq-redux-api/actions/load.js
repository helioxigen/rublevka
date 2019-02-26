import { get } from '../api';

import { throwFormattedError } from '../helpers';

export const loadElementStarted = (type, id, data) => ({
  type,
  id,
  data,
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

export async function loadElement(apiPath, id) {
  if (!apiPath) throwFormattedError('required', 'apiPath');

  const res = await get(`${apiPath}/${id}`);

  return res;

  // return .then(
  //   ({ body }) => Promise.resolve(body),
  //   ({ body: { errors } }) => Promise.reject(errors),
  // );
}
