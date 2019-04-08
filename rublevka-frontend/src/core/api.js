import { JSONToQueryParams } from '@dtrussia/utils.js';
import { API as basicUrl } from './config/resources';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

const request = (method, resource, headers, body = null) =>
  fetch(basicUrl + resource, {
    method,
    body,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(res => res.json());

export const get = (resource, params, headers) => {
  let path = resource;

  if (params) {
    const urlParams = encodeURI(JSONToQueryParams(params));
    path = `${resource}?${urlParams}`;
  }

  return request('GET', path, headers);
};

export const post = (resource, body, headers) =>
  request('POST', resource, headers, JSON.stringify(body));

export const put = (resource, body, headers) =>
  request('PUT', resource, headers, JSON.stringify(body));
