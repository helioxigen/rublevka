export const apps = {
  cem: {
    MODULE: 'cem',
    production: {
      HOST: 'cem.jq.estate',
    },
    development: {
      HOST: 'cem-dev.jq.estate',
    },
  },
  jqestate: {
    MODULE: 'site',
    INSTANCE: 'jqestate',
    production: {
      HOST: 'jq.estate',
    },
    development: {
      HOST: 'dev.jq.estate',
    },
  },
  rublevka: {
    MODULE: 'site',
    INSTANCE: 'rublevka',
    production: {
      HOST: 'rublevka.ru',
    },
    development: {
      HOST: 'dev2.rublevka.ru',
    },
    local: {
      HOST: 'localhost:3000',
    },
  },
  riga: {
    MODULE: 'site',
    INSTANCE: 'riga',
    production: {
      HOST: 'riga.ru',
    },
    development: {
      HOST: 'dev.riga.ru',
    },
  },

  // 'renessans-park': {
  //   MODULE: 'landing',
  //   INSTANCE: 'renessans',
  //   production: {
  //     HOST: 'kp-renessans.ru',
  //     config: {
  //       settlementId: 408,
  //     },
  //   },
  //   development: {
  //     HOST: 'dev.kp-renessans.ru',
  //     config: {
  //       settlementId: 408,
  //     },
  //   },
  // },
};

export const { MODULE, INSTANCE } = apps[process.env.APP];
export const { HOST, credentials = {}, config = {} } =
  apps[process.env.APP][process.env.APP_ENV] || {};
