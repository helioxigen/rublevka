const envs = {
  production: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api.jq.estate',
  },
  development: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api-dev.jq.estate',
  },
  local: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || '',
  },
};

const { apiPath } = envs[process.env.APP_ENV || 'local'];

// TODO FIXME use queryparams
export const get = (resource, qp) =>
  fetch(apiPath + resource).then(res => res.json());

export const post = () => {};

export const put = () => {};

export const del = () => {};
