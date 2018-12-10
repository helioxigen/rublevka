export const api = {
  cem: 'https://api-dev.jqestate.ru/',
  // yard: `//api.rublevka.ru/`,
  crm: '//proxy.dtrussia.com/company/RESTfm/CRM/layout/',
  cloudfront: '//images.jqestate.ru',
};

export const filters = {
  propertyCategory: {
    country: [
      {
        value: 'house',
        label: 'дом',
      }, {
        value: 'townhouse',
        label: 'таунхаус',
      }, {
        value: 'penthouse',
        label: 'пентхаус',
      }, {
        value: 'land',
        label: 'участок',
      }, {
        value: 'flat',
        label: 'квартира',
      },
    ],
    city: [
      {
        value: 'house',
        label: 'дом',
      }, {
        value: 'townhouse',
        label: 'таунхаус',
      }, {
        value: 'penthouse',
        label: 'пентхаус',
      }, {
        value: 'land',
        label: 'участок',
      }, {
        value: 'flat',
        label: 'квартира',
      },
    ],
  },

  dealType: [
    { value: 'sale', label: 'Купить' },
    { value: 'rent', label: 'Снять' },
  ],
};

export const filter = {
  quality: [
    { value: 'rough_finish', label: 'черн. отделка' },
    { value: 'full_construction', label: 'под ключ' },
    { value: 'partly_turnkey', label: 'част. под ключ' },
  ],

  qualityCity: [
    { value: 'rough_finish', label: 'черн. отделка' },
    { value: 'full_construction', label: 'под ключ' },
    { value: 'partly_turnkey', label: 'част. под ключ' },
    { value: 'design', label: 'дизайнерский' },
  ],

  layout: [
    { label: 'cвободная', value: 'open' },
    { label: 'cмежная', value: 'adjacent' },
    { label: 'изолированая', value: 'isolated' },
  ],

  constructionStage: [
    { label: 'строится', value: 'in_progress' },
    { label: 'построен, но не сдан', value: 'not_delivered_yet' },
    { label: 'сдан в эксплуатацию', value: 'done' },
  ],

  constructionKind: [
    { label: 'кирпич', value: 'brick' },
    { label: 'монолит', value: 'monolith' },
    { label: 'монолит-кирпич', value: 'brick_monolithic' },
    { label: 'панель', value: 'panel' },
  ],

  parkings: [
    { label: 'паркинг', value: 'parkings' },
    { label: 'подземный гараж', value: 'undergroundGarages' },
  ],

  propertyCategory: {
    country: [
      {
        value: 'house',
        label: 'дом',
      }, {
        value: 'townhouse',
        label: 'таунхаус',
      }, {
        value: 'penthouse',
        label: 'пентхаус',
      }, {
        value: 'land',
        label: 'участок',
      }, {
        value: 'flat',
        label: 'квартира',
      },
    ],
    city: [
      {
        value: 'house',
        label: 'дом',
      }, {
        value: 'townhouse',
        label: 'таунхаус',
      }, {
        value: 'penthouse',
        label: 'пентхаус',
      }, {
        value: 'land',
        label: 'участок',
      }, {
        value: 'flat',
        label: 'квартира',
      },
    ],
  },

  'location.routeId': [
    { value: '178', label: 'Рублёво-Успенское ш.' },
    { value: '192', label: 'Ильинское ш.' },
    { value: '186', label: 'Новорижское ш.' },
    { value: '180', label: 'Можайское ш.' },
    { value: '179', label: 'Минское ш.' },
    { value: '181', label: 'Сколковское ш.' },
    // { value: `182`, label: `Осташковское ш.` },
    { value: '191', label: 'Пятницкое' },
    { value: '177', label: 'Киевское ш.' },
    // { value: `183`, label: `Боровское ш.` },
    { value: '183', label: 'Калужское ш.' },
    { value: '185', label: 'Дмитровское ш.' },
  ],

  routeId: [
    { value: '178', label: 'Рублёво-Успенское ш.' },
    { value: '192', label: 'Ильинское ш.' },
    { value: '186', label: 'Новорижское ш.' },
    { value: '180', label: 'Можайское ш.' },
    { value: '179', label: 'Минское ш.' },
    { value: '181', label: 'Сколковское ш.' },
    // { value: `182`, label: `Осташковское ш.` },
    { value: '191', label: 'Пятницкое' },
    { value: '177', label: 'Киевское ш.' },
    // { value: `183`, label: `Боровское ш.` },
    { value: '183', label: 'Калужское ш.' },
    { value: '185', label: 'Дмитровское ш.' },
  ],

  dealType: [
    { value: 'sale', label: 'Купить' },
    { value: 'rent', label: 'Снять' },
  ],
};

export const dictionary = {
  landState: {
    individual_housing: 'ИЖС',
    gardening_partnership: 'СНТ',
    non_commercial_partnership: 'ДНП',
  },
  quality: {
    non_completed: 'недостроен',
    without_finishing: 'без отделки',
    finishing: 'чист. отделка',
    no_furniture: 'без мебели',
    with_furniture: 'с мебелью',
  },
  dealType: {
    sale: 'купить',
    rent: 'арендовать',
  },
  propertyCategory: {
    house: 'дом',
    townhouse: 'таунхаус',
    penthouse: 'пентхаус',
    flat: 'квартира',
    land: 'участок',
  },
  propertyTypeDescription: {
    house: 'дома',
    townhouse: 'таунхауса',
    penthouse: 'пентхауса',
    flat: 'квартиры',
    land: 'участка',
  },
  propertySimilar: {
    house: 'дома',
    townhouse: 'таунхаусы',
    penthouse: 'пентхаусы',
    flat: 'квартиры',
    land: 'участки',
  },
  roofType: {
    steel: 'кровельная сталь',
    softtile: 'мягкая черепица',
    copper: 'медь',
    metaltile: 'металлочерепица',
    slate: 'сланец',
    tile: 'черепица',
    utilized: 'эксплуатируемая кровля',
  },
  landType: {
    near_water: 'около воды',
    near_forest: 'прилесной',
    forest: 'лесной',
    field: 'полевой',
  },
  wallMaterial: {
    bluemax: 'блюмакс',
    wood: 'дерево',
    brick: 'кирпич',
    blocks: 'блоки',
    monolyth: 'монолит',
  },
  gasSupply: {
    without_gas: 'отсутствует',
    gas_holder: 'газгольдер',
    near_border: 'на границе',
    mains: 'магистральный газ',
    diesel: 'дизель',
  },
  waterSupply: {
    purification: 'система водоочистки',
    central: 'центральное',
    well: 'скважина',
  },
  sewers: {
    central: 'центральная канализация',
    septic: 'септик',
  },
  floors: {
    base: 'Цоколь',
    attic: 'Мансарда',
    1: '1-й этаж',
    2: '2-й этаж',
    3: '3-й этаж',
    4: '4-й этаж',
    5: '5-й этаж',
  },
  routes: {
    rublevka: ['Ильинское', 'Рублёво-Успенское', 'Рублево-Успенское'],
    riga: ['Новорижское'],
  },
  places: {
    settlements: 'Посёлки',
    routes: 'Шоссе',
  },
  orderBy: {
    name: 'по алфавиту',
    price: 'по цене',
    'saleOffer.price': 'по цене',
    'rentOffer.price': 'по цене',
    'saleOffer.multiCurrencyPrice.usd': 'по цене',
    'rentOffer.multiCurrencyPrice.usd': 'по цене',
    'location.mkadDistance': 'по удаленности',
    'landDetails.area': 'по пл. участка',
    'specification.area': 'по пл. дома',
    'specification.totalArea': 'по площади',
    'specification.rooms': 'по кол-ву комнат',
    'specification.floor': 'по этажу',
  },
};

export const values = {
  id: {
    key: 'ID',
  },
  value: {
    key: 'value',
  },
  settlement: {
    key: 'Посёлок',
  },
  completedAt: {
    key: 'Завершен',
  },
  floors: {
    key: 'Кол-во уровней',
  },
  wallMaterial: {
    key: 'Материал стен',
  },
  roofType: {
    key: 'Материал крыши',
  },
  pool: {
    key: 'Бассейн',
  },
  parking: {
    key: 'Парковка',
  },
  landType: {
    key: 'Тип',
  },
  landscaping: {
    key: 'Ландшафт',
  },
  gasSupply: {
    key: 'Тип газа',
  },
  waterSupply: {
    key: 'Источник воды',
  },
  sewers: {
    key: 'Канализация',
  },
  town: {
    key: 'Населённый пункт',
  },
  foundingYear: {
    key: 'Год основания',
  },
  objectsCount: {
    key: 'Кол-во предложений',
  },

  // with dimensions
  mkadDistance: {
    key: 'От МКАД',
    dimension: 'км',
  },
  landSize: {
    key: 'Участок',
    dimension: 'соток',
  },
  propertySize: {
    key: 'Дом',
    dimension: 'м²',
  },
  powerSupply: {
    key: 'Электричество',
    dimension: 'кВт',
  },
  totalArea: {
    key: 'Общая площадь',
    dimension: 'Га',
  },

  // filter
  propertyCategory: {
    key: 'тип недвижимости',
  },
  'deals.priceDelta': {
    key: 'с измененной ценой',
  },
  updatedAt: {
    key: 'новые',
  },
  quality: {
    key: 'состояние дома',
  },
  'location.mkadDistance': {
    key: 'от МКАД',
  },
  'objectProperty.area': {
    key: 'дом',
  },
  'landProperty.area': {
    key: 'участок',
  },
  'deals.multiCurrencyPrice.usd': {
    key: 'стоимость',
  },
  'location.subLocality1Id': {
    key: 'ID посёлка',
  },

  // Settlement
  'additionalProperties.objectsCount.residential': {
    key: 'Кол-во предложений',
  },
};

export const layouts = {
  wine_room: {
    declensions: ['Винная', 'винные', 'винных'],
  },
  dressing_room: {
    declensions: ['Гардеробная', 'гардеробные', 'гардеробных'],
  },
  living_room: {
    declensions: ['Гостиная', 'гостиные', 'гостиных'],
  },
  childrens_room: {
    declensions: ['Детская', 'детские', 'детских'],
  },
  movie_theater: {
    declensions: ['Кинотеатр', 'кинотеатра', 'кинотеатров'],
  },
  winter_garden: {
    declensions: ['Зимний сад', 'зимниx сада', 'зимних садов'],
  },
  game_room: {
    declensions: ['Игровая', 'игровые', 'игровых'],
  },
  office: {
    declensions: ['Кабинет', 'кабинета', 'кабинетов'],
  },
  storage: {
    declensions: ['Кладовая', 'кладовые', 'кладовых'],
  },
  kitchen: {
    declensions: ['Кухня', 'кухни', 'кухонь'],
  },
  staff_room: {
    declensions: ['Комната персонала', 'комнаты персонала', 'комнат персонала'],
  },
  working_kitchen: {
    declensions: ['Рабочая кухня', 'рабочие кухни', 'рабочих кухонь'],
  },
  spa_zone: {
    declensions: ['СПА-зона', 'СПА-зоны', 'СПА-зон'],
  },
  dining_room: {
    declensions: ['Столовая', 'столовые', 'столовых'],
  },
  technical_room: {
    declensions: ['Техническое помещение', 'технических помещения', 'технических помещений'],
  },
  gym: {
    declensions: ['Тренажёрный зал', 'тренажёрных зала', 'тренажёрных залов'],
  },
  utility_room: {
    declensions: ['Хозяйственное помещение', 'хозяйственных помещения', 'хозяйственных помещений'],
  },
  loft: {
    declensions: ['Мансарда', 'мансарды', 'мансард'],
  },
};

export const maxRooms = 4;
