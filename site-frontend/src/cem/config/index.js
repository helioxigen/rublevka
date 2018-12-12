const config = {
  development: {
    intercom: {
      app_id: 'f5ciamrs',
    },
  },
  production: {
    intercom: {
      app_id: 'uk4ssd51',
    },
  },
};

export default config[process.env.APP_ENV || 'development'];
