const envs = {
  production: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || 'https://api.rublevka.ru',
  },
  development: {
    apiPath:
      process.env.REACT_APP_API_ENDPOINT ||
      `https://us-central1-rublevka-export-384da.cloudfunctions.net/cors?${encodeURI(
        'https://dev.rublevka.ru/api',
      )}`,
  },
  local: {
    apiPath: process.env.REACT_APP_API_ENDPOINT || '',
  },
};

const { apiPath } = envs[process.env.REACT_APP_ENV || 'development'];

// TODO FIXME use queryparams
export const get = (resource, qp) =>
  fetch(apiPath + resource, { mode: 'no-cors' }).then(res => res.json());

export const post = () => {};

export const put = () => {};

export const del = () => {};
