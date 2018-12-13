const envs = {
  production: {
    API: process.env.API_ENDPOINT || "//api.jqestate.ru",
    cloudfront: "//images.jqestate.ru"
  },
  development: {
    API: process.env.API_ENDPOINT || "//api-dev.jqestate.ru",
    cloudfront: "//images.jqestate.ru"
  },
  local: {
    API: process.env.API_ENDPOINT || "/api-dev",
    cloudfront: "//images.jqestate.ru"
  }
};

export const { API, cloudfront } = envs[process.env.APP_ENV];
