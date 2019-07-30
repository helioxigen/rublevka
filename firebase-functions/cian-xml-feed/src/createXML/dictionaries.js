exports.offerKinds = {
  sale: 'Продажа',
  rent: 'Аренда',
};

exports.dealTypes = {
  sale: 'purchase',
  rent: 'rent',
};

exports.resaleKinds = {
  [true]: 'Вторичка',
  [false]: 'Первичка',
};

exports.bathrooms = {
  combined: 'Совмещенный',
  separated: 'Раздельный',
};

exports.kinds = {
  flat: 'Квартира',
  apartment: 'Апартаменты',
  house: 'Дом',
  townhouse: 'Таунхаус',
  penthouse: 'Пентхаус',
  land: 'Участок',
  office: 'Офис',
};

exports.conditions = {
  great: 'Отличное',
  good: 'Хорошее',
  normal: 'Нормальное',
  bad: 'Плохое',
};

exports.saleKinds = {
  direct_sell: 'Прямая продажа',
  changing: 'Обмен',
  fl214: 'ФЗ-214',
  assignment: 'Подряд',
};

exports.currencies = {
  USD: '$',
  EUR: '€',
  RUB: 'руб',
};

exports.categories = {
  city: 'Городская',
  country: 'Загородная',
};

exports.deposits = {
  0: 'Отсутствует',
  1: '1 месяц',
  2: '2 месяца',
  3: '3 месяца',
  6: '6 месяцев',
  12: '12 месяцев',
};

exports.periods = {
  day: 'От суток',
  month: 'От одного месяца',
  year: 'От одного года',
};

exports.constructionStages = {
  in_progress: 'Строится',
  not_delivered_yet: 'Построен, но не сдан',
  done: 'Сдан в эксплуатацию',
};

exports.wallMaterials = {
  blue_max: 'Блюмакс',
  wood: 'Дерево',
  brick: 'Кирпич',
  block: 'Блоки',
  monolith: 'Монолит',
  canadian_sip: 'Канадская технология',
};

exports.roofMaterials = {
  steel: 'Кровельная сталь',
  soft_tile: 'Мягкая черепица',
  copper: 'Медь',
  metal_tile: 'Металлочерепица',
  slate: 'Сланец',
  tile: 'Черепица',
  rooftop: 'Эксплуатируемая кровля',
};

exports.waterSupply = {
  purification: 'Очистные сооружения',
  central: 'Центральное водоснабжение',
  well: 'Скважина',
};

exports.gasSupply = {
  without_gas: 'Без газа',
  gas_holder: 'Газгольдер',
  near_border: 'На границе',
  mains: 'Магистральный газ',
  diesel: 'Дизель',
};

exports.sewerageSupply = {
  central: 'Центральная канализация',
  septic: 'Септик',
};

exports.constructionKinds = {
  brick: 'Кирпичный',
  panel: 'Панельный',
  monolith: 'Монолит',
  brick_monolithic: 'Кирпично-монолитный',
};

exports.furnitureKinds = {
  full: 'Полностью',
  partial: 'Частично',
  absent: 'Отсутствует',
};

exports.renovateKinds = {
  rough_finish: 'Дом с черновой отделкой',
  for_finishing: 'Дом под чистовую отделку',
  full_construction: 'Дом под ключ',
  partly_turnkey: 'Дом частично под ключ',
  design: 'Дизайнерский дом',
  raw: 'Дом-коробка',
};

exports.equipment = {
  internet: 'Интернет',
  phone: 'Телефон',
  tv: 'Телевизор',
  cable_tv: 'Кабельное телевидение',
  security_signaling: 'Сигнализация',
  washmachine: 'Стиральная машина',
  intercom: 'Домофон',
  fridge: 'Холодильник',
  appliances: 'Бытовые приборы',
};

exports.securityKinds = {
  guarded: 'Охраняемая территория',
  protected_area: 'Огороженая территория',
};

exports.landscapeKinds = {
  field: 'Полевой',
  near_forest: 'Прилесной',
  near_water: 'Около воды',
  forest: 'Лесной',
  [undefined]: 'Не указан',
};

exports.states = {
  draft: {
    title: 'В черновиках',
    style: 'primary',
  },
  public: {
    title: 'Опубликован',
    style: 'success',
  },
  private: {
    title: 'Закрытая продажа',
    style: 'success',
  },
  postponed: {
    title: 'Отложен',
    style: 'warning',
  },
  sold: {
    title: 'Продан',
    style: 'danger',
  },
  rented: {
    title: 'Сдан',
    style: 'danger',
  },
  deleted: {
    title: 'Удалён',
    style: 'danger',
  },
};

exports.bannerStatesPlural = {
  ordered: 'Заказанные',
  active: 'Активные',
  removed: 'Снятые',
  denied: 'Отказано',
};

exports.bannerStates = {
  ordered: 'заказан',
  active: 'активен',
  removed: 'снят',
  denied: 'отказано',
};

exports.floors = {
  base: 'Цоколь',
  floor: 'этаж',
  attic: 'Мансарда',
};

exports.eventKinds = {
  property_pdf_export: 'Скачал презентацию без логотипа',
};

exports.orderBy = {
  'rentOffer.multiCurrencyPrice.usd': 'по цене аренды',
  'saleOffer.multiCurrencyPrice.usd': 'по цене продажи',
  id: 'по ID',
  'specification.area': 'по площади дома',
  'landDetails.area': 'по площади участка',
  'location.mkadDistance': 'по расстоянию от МКАД',
  createdAt: 'по дате создания',
  updatedAt: 'по дате обновления',
};

exports.layouts = {
  isolated: 'Изолированная',
  open: 'Свободная',
  adjacent: 'Смежная',
};

exports.windows = {
  both: 'В обе стороны',
  street: 'На улицу',
  courtyard: 'Во двор',
};

exports.conditioningKinds = {
  central: 'Центральное',
  own: 'Собственное',
  absent: 'Отсутствует',
};

exports.ventilationKinds = {
  central: 'Центральная',
  own: 'Собственная',
  absent: 'Отсутствует',
};

exports.placesToPlaceId = {
  districts: 'districtId',
  routes: 'routeIds',
  localities: 'localityId',
};

exports.routeToRouteId = {
  Новорижское: 19,
  'Рублёво-Успенское': 27,
  Ильинское: 9,
};

exports.roomsLayout = {
  childrens_room: 'детская комната',
  dining_room: 'столовая',
  dressing_room: 'гардеробная',
  game_room: 'игровая',
  gym: 'тренажёрный зал',
  kitchen: 'кухня',
  living_room: 'гостиная',
  loft: 'мансарда',
  movie_theater: 'кинотеатр',
  office: 'кабинет',
  spa_zone: 'СПА-зона',
  staff_room: 'комната персонала',
  storage: 'кладовая',
  technical_room: 'техническое помещение',
  utility_room: 'хозяйственное помещение',
  wine_room: 'комната для вина',
  winter_garden: 'зимний сад',
  working_kitchen: 'рабочая кухня',
};
