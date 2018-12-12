export const categories = {
  zagorodnaya: 'country',
  gorodskaya: 'city',
};

export const categoriesTranslit = {
  country: 'zagorodnaya',
  city: 'gorodskaya',
};

export const dealTypes = {
  prodaja: 'sale',
  arenda: 'rent',
};

export const dealTypesTranslit = {
  sale: 'prodaja',
  rent: 'arenda',
};

export const dealTypesTranslate = {
  sale: 'Продажа',
  rent: 'Аренда',
};

export const placeKinds = {
  shosse: 'routes',
  rayon: 'districts',
  'nas-punkt': 'localities',
  'kottedzhnye-poselki': 'settlements',
};

export const placeKindsTranslit = {
  routes: 'shosse',
  districts: 'rayon',
  localities: 'nas-punkt',
  settlements: 'kottedzhnye-poselki',
};

export const kinds = {
  dom: 'house',
  uchastok: 'land',
  kvartira: 'flat',
  taunhaus: 'townhouse',
  penthaus: 'penthouse',
  apartamenty: 'apartment',
  ofis: 'office',
};

export const kindsTranslit = {
  house: 'dom',
  land: 'uchastok',
  flat: 'kvartira',
  townhouse: 'taunhaus',
  penthouse: 'penthaus',
  apartment: 'apartamenty',
  office: 'ofis',
};

export const translitKinds = {
  dom: 'house',
  uchastok: 'land',
  kvartira: 'flat',
  taunhaus: 'townhouse',
  penthaus: 'penthouse',
  apartamenty: 'apartment',
  ofis: 'office',
};

export const kindsTranslatePlural = {
  house: 'Дома',
  land: 'Участки',
  flat: 'Квартиры',
  townhouse: 'Таунхаусы',
  penthouse: 'Пентхаусы',
  office: 'Офисы',
};

export const currencies = {
  usd: '$',
  eur: '€',
  rub: '₽',
};

export const priceSliderSettings = {
  city: {
    sale: {
      usd: {
        min: 0,
        max: 10,
        step: 0.5,
        rank: 'million',
      },
      eur: {
        min: 0,
        max: 10,
        step: 0.5,
        rank: 'million',
      },
      rub: {
        min: 0,
        max: 100,
        step: 5,
        rank: 'million',
      },
    },
    rent: {
      usd: {
        min: 0,
        max: 50,
        step: 2.5,
        rank: 'thousand',
      },
      eur: {
        min: 0,
        max: 50,
        step: 2.5,
        rank: 'thousand',
      },
      rub: {
        min: 0,
        max: 1,
        step: 0.05,
        rank: 'million',
      },
    },
  },
  country: {
    sale: {
      usd: {
        min: 0,
        max: 20,
        step: 1,
        rank: 'million',
      },
      eur: {
        min: 0,
        max: 20,
        step: 1,
        rank: 'million',
      },
      rub: {
        min: 0,
        max: 100,
        step: 5,
        rank: 'million',
      },
    },
    rent: {
      usd: {
        min: 0,
        max: 50,
        step: 2.5,
        rank: 'thousand',
      },
      eur: {
        min: 0,
        max: 50,
        step: 2.5,
        rank: 'thousand',
      },
      rub: {
        min: 0,
        max: 2,
        step: 0.1,
        rank: 'million',
      },
    },
  },
};

export const postfixes = {
  million: 'млн',
  thousand: 'тыс',
};

export const multipliers = {
  million: 1000000,
  thousand: 1000,
};
