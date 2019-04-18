import { recursiveJSONToQS } from './helpers';

const envs = {
  production: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api.jqestate.ru',
  },
  development: {
    apiPath:
      process.env.REACT_APP_API_ENDPOINT || 'https://api-dev.jqestate.ru',
  },
  local: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api.jqestate.ru',
  },
};

const { apiPath } = envs[process.env.REACT_APP_ENV || 'local'];

const token = '';

export const get = (resource, qp) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return fetch(`${apiPath + resource}?${recursiveJSONToQS(qp)}`, {
    headers,
  }).then(res => res.json());
};

export const post = () => {};

export const put = (resource, data) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return fetch(`${apiPath + resource}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers,
  }).then(res => res);
};

export const del = () => {};
