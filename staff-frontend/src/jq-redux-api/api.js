const envs = {
  production: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api.jqestate.ru',
  },
  development: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api.jqestate.ru',
  },
  local: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api.jqestate.ru',
  },
};

const { apiPath } = envs[process.env.REACT_APP_ENV || 'local'];

// TODO FIXME use queryparams
export const get = (resource, qp) => fetch(apiPath + resource).then(res => res.json());

export const post = () => {};

export const put = () => {};

export const del = () => {};
