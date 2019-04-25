import { recursiveJSONToQS } from './helpers';

const envs = {
  production: {
    apiPath: 'https://api.jqestate.ru',
  },
  development: {
    apiPath: 'https://api-dev.jqestate.ru',
  },
  local: {
    apiPath: 'https://api.jqestate.ru',
  },
};

const { apiPath } = envs[process.env.REACT_APP_ENV || 'local'];

const { REACT_APP_CEM_TOKEN } = process.env;

export const get = (resource, qp) => {
  const headers = {
    Authorization: `Bearer ${REACT_APP_CEM_TOKEN}`,
    'Content-Type': 'application/json',
  };
  return fetch(`${apiPath + resource}?${recursiveJSONToQS(qp)}`, {
    headers,
  }).then(res => res.json());
};

export const post = () => {};

export const put = (resource, data) => {
  const headers = {
    Authorization: `Bearer ${REACT_APP_CEM_TOKEN}`,
    'Content-Type': 'application/json',
  };
  return fetch(`${apiPath + resource}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers,
  }).then(res => res);
};

export const del = () => {};
