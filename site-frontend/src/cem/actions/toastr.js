import * as types from 'cem/constants/toastr';

export const pop = (kind, title, body, timeout) => ({
  type: types.POP,
  kind,
  title,
  body,
  timeout,
});

export const success = (title, body, timeout) => pop('success', title, body, timeout);

export const info = (title, body, timeout) => pop('info', title, body, timeout);

export const warning = (title, body, timeout) => pop('warning', title, body, timeout);

export const error = (title, body, timeout) => pop('error', title, body, timeout);

export const flush = () => ({
  type: types.FLUSH,
});

export const expire = id => ({
  type: types.EXPIRE,
  id,
});
