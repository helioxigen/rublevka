export const states = {
  draft: {
    style: 'primary',
    title: 'В черновиках',
  },
  public: {
    style: 'success',
    title: 'Опубликован',
  },
};

export const houseKinds = {
  new: {
    title: 'Новостройка',
  },
  khrushchevka: {
    title: 'Хрущёвка',
  },
  stalinka: {
    title: 'Сталинка',
  },
};

export const constructionStages = {
  in_progress: 'Строится',
  not_delivered_yet: 'Построен, но не сдан',
  done: 'Cдан в эксплуатацию',
};

export const deliveryQuarters = {
  first: 'I',
  second: 'II',
  third: 'III',
  fourth: 'IV',
};

export const contractTypes = {
  ddu: 'ДДУ',
  assignation: 'Переуступка',
  dkp: 'ДКП',
  pdkp: 'ПДКП',
  investment: 'Договор инвестирования',
};

export const constructionKinds = {
  brick: 'Кирпичный',
  panel: 'Панельный',
  monolith: 'Монолитный',
  brick_monolithic: 'Кирпично-монолитный',
};

export const securityKinds = {
  guarded: 'Охраняемая территория',
  protected_area: 'Огороженная территория',
};
