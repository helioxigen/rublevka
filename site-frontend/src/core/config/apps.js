export const apps = {
  cem: {
    MODULE: 'cem',
    production: {
      HOST: 'cem.jqestate.ru',
    },
    development: {
      HOST: 'cem-dev.jqestate.ru',
    },
  },
  jqestate: {
    MODULE: 'site',
    INSTANCE: 'jqestate',
    production: {
      HOST: 'jqestate.ru',
    },
    development: {
      HOST: 'dev.jqestate.ru',
    },
  },
  rublevka: {
    MODULE: 'site',
    INSTANCE: 'rublevka',
    production: {
      HOST: 'rublevka.ru',
    },
    development: {
      HOST: 'dev.rublevka.ru',
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
  kievka: {
    MODULE: 'site',
    INSTANCE: 'kievka',
    production: {
      HOST: 'kievka.ru',
    },
    development: {
      HOST: 'dev.kievka.ru',
    },
  },
  minka: {
    MODULE: 'site',
    INSTANCE: 'minka',
    production: {
      HOST: 'minka.ru',
    },
    development: {
      HOST: 'dev.minka.ru',
    },
  },

  'renessans-park': {
    MODULE: 'landing',
    INSTANCE: 'renessans',
    production: {
      HOST: 'kp-renessans.ru',
      config: {
        settlementId: 408,
      },
    },
    development: {
      HOST: 'dev.kp-renessans.ru',
      config: {
        settlementId: 408,
      },
    },
  },
};

export const { MODULE, INSTANCE } = apps[process.env.APP];
export const { HOST, credentials = {}, config = {} } = apps[process.env.APP][
  process.env.APP_ENV
] || {};
