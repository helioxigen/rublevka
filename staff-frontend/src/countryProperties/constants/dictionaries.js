export const undef = 'Не указано';

export const offerKinds = {
  purchase: 'Покупка',
  rent: 'Аренда',
};

export const dealTypes = {
  sale: 'покупка',
  rent: 'аренда',
};

export const resaleKinds = {
  [true]: 'Вторичка',
  [false]: 'Первичка',
};

export const bathrooms = {
  combined: 'Совмещенный',
  separated: 'Раздельный',
};

export const bedrooms = {
  2: 'от 2',
  3: 'от 3',
  4: 'от 4',
  5: 'от 5',
};

export const kinds = {
  house: 'Дом',
  townhouse: 'Таунхаус',
  land: 'Участок',
  flat: 'Квартира',
};

export const conditions = {
  great: '⭐ Отличное',
  good: '👍 Хорошее',
  // normal: '👌 Нормальное',
  bad: '👎 Плохое',
};

export const saleKinds = {
  direct_sell: 'Прямая продажа',
  changing: 'Обмен',
  fl214: 'ФЗ-214',
  assignment: 'Подряд',
};

export const feeKinds = {
  fixed: 'фиксированная',
  percent: 'процент',
};

export const currencies = {
  RUB: 'руб',
  USD: '$',
  EUR: '€',
};

export const categories = {
  city: 'Городская',
  country: 'Загородная',
};

export const deposits = {
  0: 'Отсутствует',
  1: '1 месяц',
  2: '2 месяца',
  3: '3 месяца',
  6: '6 месяцев',
  // 12: '12 месяцев',
};

export const periods = {
  day: 'От суток',
  month: 'От одного месяца',
  year: 'От одного года',
};

export const constructionStages = {
  in_progress: 'Строится',
  not_delivered_yet: 'Построен, но не сдан',
  done: 'Сдан в эксплуатацию',
};

export const wallMaterials = {
  blue_max: 'Блюмакс',
  wood: 'Дерево',
  brick: 'Кирпич',
  block: 'Блоки',
  monolith: 'Монолит',
  canadian_sip: 'Канадская технология',
};

export const roofMaterials = {
  steel: 'Кровельная сталь',
  soft_tile: 'Мягкая черепица',
  copper: 'Медь',
  metal_tile: 'Металлочерепица',
  slate: 'Сланец',
  tile: 'Черепица',
  rooftop: 'Эксплуатируемая кровля',
};

export const waterSupplyKind = {
  central: 'Центральное',
  // purification: 'Очистные сооружения',
  well: 'Скважина',
};

export const gasSupplyKind = {
  mains: 'Магистральный',
  without_gas: 'Без газа',
  gas_holder: 'Газгольдер',
  near_border: 'На границе',
  diesel: 'Дизель',
};

export const sewerageSupplyKind = {
  central: 'Центральная',
  septic: 'Септик',
};

export const constructionKinds = {
  brick: 'Кирпичный',
  panel: 'Панельный',
  monolith: 'Монолит',
  brick_monolithic: 'Кирпично-монолитный',
};

export const furnitureKinds = {
  full: 'Полностью',
  partial: 'Частично',
  absent: 'Отсутствует',
};

export const renovateKinds = {
  raw: 'Коробка',
  rough_finish: 'Черновая',
  for_finishing: 'Чистовая',
  full_construction: 'Под ключ',
  // partly_turnkey: 'Частично под ключ',
  // design: 'Дизайнерский',
};

export const equipment = {
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

export const securityKinds = {
  guarded: 'Охраняемая территория',
  protected_area: 'Огороженая территория',
};

export const landscapeKinds = {
  field: '🌾 Полевой',
  near_forest: '🌿 Прилесной',
  near_water: '💦 Около воды',
  forest: '🌲 Лесной',
};

export const states = {
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

export const bannerStatesPlural = {
  ordered: 'Заказанные',
  active: 'Активные',
  removed: 'Снятые',
  denied: 'Отказано',
};

export const bannerStates = {
  ordered: 'заказан',
  active: 'активен',
  removed: 'снят',
  denied: 'отказано',
};

export const floors = {
  base: 'Цоколь',
  floor: 'этаж',
  attic: 'Мансарда',
};

export const eventKinds = {
  property_pdf_export: 'Скачал презентацию без логотипа',
};

export const orderBy = {
  'rentOffer.multiCurrencyPrice.usd': 'по цене аренды',
  'saleOffer.multiCurrencyPrice.usd': 'по цене продажи',
  id: 'по ID',
  'specification.area': 'по площади дома',
  'landDetails.area': 'по площади участка',
  'location.mkadDistance': 'по расстоянию от МКАД',
  createdAt: 'по дате создания',
  updatedAt: 'по дате обновления',
};

export const layouts = {
  isolated: 'Изолированная',
  open: 'Свободная',
  adjacent: 'Смежная',
};

export const windows = {
  both: 'В обе стороны',
  street: 'На улицу',
  courtyard: 'Во двор',
};

export const conditioningKinds = {
  central: 'Центральное',
  own: 'Собственное',
  absent: 'Отсутствует',
};

export const ventilationKinds = {
  central: 'Центральная',
  own: 'Собственная',
  absent: 'Отсутствует',
};

export const placesToPlaceId = {
  districts: 'districtId',
  routes: 'routeIds',
  localities: 'localityId',
};

export const mainLayouts = {
  wine_room: 'Комнаты для вина',
  dressing_room: 'Гардеробные',
  living_room: 'Гостиные',
  childrens_room: 'Детские комнаты',
  movie_theater: 'Кинотеатры',
  winter_garden: 'Зимние сады',
  game_room: 'Игровые',
  office: 'Кабинеты',
  storage: 'Кладовые',
  kitchen: 'Кухни',
  staff_room: 'Комнаты персонала',
  working_kitchen: 'Рабочие кухни',
  spa_zone: 'СПА-зоны',
  dining_room: 'Столовые',
  technical_room: 'Технические помещения',
  gym: 'Тренажёрные залы',
  utility_room: 'Хозяйственные помещения',
  loft: 'Мансарды',
};

export const binarySelect = {
  [true]: 'да',
  [false]: 'нет',
};

export const prices = {
  usd: {
    sale: [
      { value: 0, label: '$0 млн' },
      { value: 1, label: '$1 млн' },
      { value: 2, label: '$2 млн' },
      { value: 3, label: '$3 млн' },
      { value: 4, label: '$4 млн' },
      { value: 5, label: '$5 млн' },
      { value: 6, label: '$6 млн' },
      { value: 7, label: '$7 млн' },
      { value: 8, label: '$8 млн' },
      { value: 9, label: '$9 млн' },
      { value: 'max', label: '$10+ млн' },
    ],
    rent: [
      { value: 0, label: '$0 тыс/мес' },
      { value: 1, label: '$1 тыс/мес' },
      { value: 2, label: '$2 тыс/мес' },
      { value: 3, label: '$3 тыс/мес' },
      { value: 4, label: '$4 тыс/мес' },
      { value: 5, label: '$5 тыс/мес' },
      { value: 6, label: '$6 тыс/мес' },
      { value: 7, label: '$7 тыс/мес' },
      { value: 8, label: '$8 тыс/мес' },
      { value: 9, label: '$9 тыс/мес' },
      { value: 10, label: '$10 тыс/мес' },
      { value: 15, label: '$15 тыс/мес' },
      { value: 20, label: '$20 тыс/мес' },
      { value: 25, label: '$25 тыс/мес' },
      { value: 30, label: '$30 тыс/мес' },
      { value: 35, label: '$35 тыс/мес' },
      { value: 40, label: '$40 тыс/мес' },
      { value: 'max', label: '$45+ тыс/мес' },
    ],
  },
  rub: {
    sale: [
      { value: 0, label: '0 млн ₽' },
      { value: 50, label: '50 млн ₽' },
      { value: 100, label: '100 млн ₽' },
      { value: 150, label: '150 млн ₽' },
      { value: 200, label: '200 млн ₽' },
      { value: 250, label: '250 млн ₽' },
      { value: 300, label: '300 млн ₽' },
      { value: 350, label: '350 млн ₽' },
      { value: 400, label: '400 млн ₽' },
      { value: 450, label: '450 млн ₽' },
      { value: 500, label: '500 млн ₽' },
      { value: 550, label: '550 млн ₽' },
      { value: 'max', label: '600+ млн ₽' },
    ],
    rent: [
      { value: 0, label: '0 тыс/мес' },
      { value: 100, label: '100 тыс/мес' },
      { value: 150, label: '150 тыс/мес' },
      { value: 200, label: '200 тыс/мес' },
      { value: 250, label: '250 тыс/мес' },
      { value: 300, label: '300 тыс/мес' },
      { value: 350, label: '350 тыс/мес' },
      { value: 400, label: '400 тыс/мес' },
      { value: 450, label: '450 тыс/мес' },
      { value: 500, label: '500 тыс/мес' },
      { value: 550, label: '550 тыс/мес' },
      { value: 600, label: '600 тыс/мес' },
      { value: 650, label: '650 тыс/мес' },
      { value: 700, label: '700 тыс/мес' },
      { value: 750, label: '750 тыс/мес' },
      { value: 800, label: '800 тыс/мес' },
      { value: 850, label: '850 тыс/мес' },
      { value: 900, label: '900 тыс/мес' },
      { value: 950, label: '950 тыс/мес' },
      { value: 'max', label: '1 млн+ в мес' },
    ],
  },
};

export const mkadDistance = [
  { value: 0, label: '0 км' },
  { value: 5, label: '5 км' },
  { value: 10, label: '10 км' },
  { value: 15, label: '15 км' },
  { value: 20, label: '20 км' },
  { value: 25, label: '25 км' },
  { value: 'max', label: 'от 25 км' },
];

export const areas = [
  { value: 0, label: '0 м²' },
  { value: 100, label: '100 м²' },
  { value: 200, label: '200 м²' },
  { value: 300, label: '300 м²' },
  { value: 400, label: '400 м²' },
  { value: 500, label: '500 м²' },
  { value: 600, label: '600 м²' },
  { value: 700, label: '700 м²' },
  { value: 800, label: '800 м²' },
  { value: 900, label: '900 м²' },
  { value: 1000, label: '1000 м²' },
  { value: 1100, label: '1100 м²' },
  { value: 1200, label: '1200 м²' },
  { value: 1300, label: '1300 м²' },
  { value: 1400, label: '1400 м²' },
  { value: 1500, label: '1500 м²' },
  { value: 1600, label: '1600 м²' },
  { value: 1700, label: '1700 м²' },
  { value: 1800, label: '1800 м²' },
  { value: 1900, label: '1900 м²' },
  { value: 'max', label: '2000+ м²' },
];

export const landAreas = [
  { value: 0, label: '0 сот' },
  { value: 10, label: '10 сот' },
  { value: 20, label: '20 сот' },
  { value: 30, label: '30 сот' },
  { value: 40, label: '40 сот' },
  { value: 50, label: '50 сот' },
  { value: 60, label: '60 сот' },
  { value: 70, label: '70 сот' },
  { value: 80, label: '80 сот' },
  { value: 90, label: '90 сот' },
  { value: 'max', label: '100+ сот' },
];

export const dictionaryToOptions = dic =>
  Object.entries(dic).map(([key, value]) => ({ value: key, label: value }));
