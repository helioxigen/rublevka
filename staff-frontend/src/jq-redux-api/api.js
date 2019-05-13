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

// eslint-disable-next-line
let currToken = null;
// eslint-disable-next-line
export const setToken = token => (currToken = token);

const getErrors = async (resp) => {
  const { status } = resp;

  if (status === 401) {
    return ['Unauthorized'];
  }
  const result = await resp.json();
  const { errors } = result;
  return errors;
};

const getFailResponse = async (resp) => {
  const { status } = resp;
  const errors = await getErrors(resp);
  return { body: { errors }, status };
};

const getResponseData = async (resp) => {
  try {
    return await resp.json();
  } catch (errror) {
    return resp;
  }
};

export const get = (resource, qp) => {
  const headers = {
    Authorization: `Bearer ${currToken}`,
    'Content-Type': 'application/json',
  };
  return fetch(`${apiPath + resource}?${recursiveJSONToQS(qp)}`, {
    headers,
  }).then(res => res.json());
};

export const post = (resource, data) => {
  const headers = {
    Authorization: `Bearer ${currToken}`,
    'Content-Type': 'application/json',
  };

  return fetch(`${apiPath + resource}`, {
    method: 'post',
    body: JSON.stringify(data),
    headers,
  }).then(async (res) => {
    if (res.ok) {
      return Promise.resolve(getResponseData(res));
    }
    return Promise.reject(await getFailResponse(res));
  });
};

export const put = (resource, data) => {
  const headers = {
    Authorization: `Bearer ${currToken}`,
    'Content-Type': 'application/json',
  };
  return fetch(`${apiPath + resource}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers,
  }).then(async (res) => {
    if (res.ok) {
      return Promise.resolve(getResponseData(res));
    }
    return Promise.reject(await getFailResponse(res));
  });
};

export const del = (resource) => {
  const headers = {
    Authorization: `Bearer ${currToken}`,
    'Content-Type': 'application/json',
  };
  return fetch(`${apiPath + resource}`, {
    method: 'delete',
    headers,
  }).then(async (res) => {
    if (res.ok) {
      return Promise.resolve(res);
    }
    return Promise.reject(await getFailResponse(res));
  });
};
