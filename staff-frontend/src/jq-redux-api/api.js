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

// FIXME
function recursiveJSONToQS(object, prevKey) {
  if (object) {
    return Object.keys(object)
      .map((key) => {
        const value = object[key];

        if (key && (value || (Array.isArray(value) && value.length))) {
          if (
            value instanceof Object
            && !(value instanceof Array)
            && !(value instanceof Function)
          ) {
            return recursiveJSONToQS(value, key);
          }
          if (prevKey) {
            return `${prevKey}[${key}]=${value}`;
          }
          return `${key}=${value}`;
        }
        return null;
      })
      .filter(item => !!item)
      .join('&');
  }

  return null;
}

// TODO FIXME use queryparams
export const get = (resource, qp) => fetch(`${apiPath + resource}?${recursiveJSONToQS(qp)}`).then(res => res.json());

export const post = () => {};

export const put = () => {};

export const del = () => {};
