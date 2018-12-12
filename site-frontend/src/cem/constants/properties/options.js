import * as dict from './dictionaries';

export const bathrooms = [
  { id: 'combined', title: 'Совмещенный' },
  { id: 'separated', title: 'Раздельный' },
];

export const categories = [
  { id: 'city', title: 'Городская' },
  { id: 'country', title: 'Загородная' },
];

export const kinds = [
  { id: 'flat', title: 'Квартира' },
  { id: 'apartment', title: 'Апартаменты' },
  { id: 'room', title: 'Комната' },
  { id: 'house', title: 'Дом' },
  { id: 'townhouse', title: 'Таунхаус' },
  { id: 'penthouse', title: 'Пентхаус' },
  { id: 'land', title: 'Участок' },
  { id: 'office', title: 'Офис' },
];

export const states = [
  { id: 'draft', title: 'В черновиках', styling: 'primary' },
  { id: 'public', title: 'Опубликован', styling: 'success' },
  { id: 'private', title: 'Закрытая продажа', styling: 'success' },
  { id: 'postponed', title: 'Отложен', styling: 'warning' },
  { id: 'sold', title: 'Продан', styling: 'danger' },
  { id: 'rented', title: 'Сдан', styling: 'danger' },
];

export const saleKinds = [
  { id: 'direct_sell', title: 'Прямая продажа' },
  { id: 'changing', title: 'Обмен' },
  { id: 'fl214', title: 'ФЗ-214' },
  { id: 'assignment', title: 'Подряд' },
];

export const depositAmounts = [
  { id: 0, title: 'Отсутствует' },
  { id: 1, title: '1 месяц' },
  { id: 2, title: '2 месяца' },
  { id: 3, title: '3 месяца' },
  { id: 6, title: '6 месяцев' },
  { id: 12, title: '12 месяцев' },
];

export const rentPeriods = [
  { id: 'day', title: 'От суток' },
  { id: 'month', title: 'От одного месяца' },
  { id: 'year', title: 'От одного года' },
];

export const windowOverlook = [
  { id: 'both', title: 'В обе стороны' },
  { id: 'street', title: 'На улицу' },
  { id: 'courtyard', title: 'Во двор' },
];

export const conditions = [
  { id: 'great', title: 'Отличное' },
  { id: 'good', title: 'Хорошее' },
  { id: 'normal', title: 'Нормальное' },
  { id: 'bad', title: 'Плохое' },
];

export const conditioning = [
  { id: 'central', title: 'Центральное' },
  { id: 'own', title: 'Собственное' },
  { id: 'absent', title: 'Отсутствует' },
];

export const furniture = [
  { id: 'full', title: 'Полностью' },
  { id: 'partial', title: 'Частично' },
  { id: 'absent', title: 'Отсутствует' },
];

export const ventilation = [
  { id: 'central', title: 'Центральная' },
  { id: 'own', title: 'Собственная' },
  { id: 'absent', title: 'Отсутствует' },
];

export const renovate = [
  { id: 'rough_finish', title: 'Черновая отделка' },
  { id: 'for_finishing', title: 'Под чистовую отделку' },
  { id: 'full_construction', title: 'Под ключ' },
  { id: 'partly_turnkey', title: 'Частично под ключ' },
  { id: 'design', title: 'Дизайнерский' },
  { id: 'raw', title: 'Коробка' },
];

export const equipment = [
  { id: 'internet', title: 'Интернет' },
  { id: 'phone', title: 'Телефон' },
  { id: 'tv', title: 'Телевизор' },
  { id: 'cable_tv', title: 'Кабельное телевидение' },
  { id: 'security_signaling', title: 'Сигнализация' },
  { id: 'washmachine', title: 'Стиральная машина' },
  { id: 'intercom', title: 'Домофон' },
  { id: 'fridge', title: 'Холодильник' },
  { id: 'appliances', title: 'Бытовые приборы' },
];

export const houseKinds = [
  { label: 'Новостройка', value: 'new' },
  { label: 'Хрущёвка', value: 'khrushchevka' },
  { label: 'Сталинка', value: 'stalinka' },
];

export const deliveryQuarters = [
  { label: 'Первый', value: 'first' },
  { label: 'Второй', value: 'second' },
  { label: 'Третий', value: 'third' },
  { label: 'Четвёртый', value: 'fourth' },
];

export const constructionStages = [
  { label: 'Строится', value: 'in_progress' },
  { label: 'Построен, но не сдан', value: 'not_delivered_yet' },
  { label: 'Cдан в эксплуатацию', value: 'done' },
];

export const constructionKinds = [
  { label: 'Кирпичный', value: 'brick' },
  { label: 'Панельный', value: 'panel' },
  { label: 'Монолитный', value: 'monolith' },
  { label: 'Кирпично-монолитный', value: 'brick_monolithic' },
];

export const securityKinds = [
  { label: 'Охраняемая территория', value: 'guarded' },
  { label: 'Огороженная территория', value: 'protected_area' },
];

export const layoutKinds = [
  { label: 'Свободная', value: 'open' },
  { label: 'Смежная', value: 'adjacent' },
  { label: 'Изолированная', value: 'isolated' },
];

export const resaleKinds = [
  { label: 'Первичка', value: 'false' },
  { label: 'Вторичка', value: 'true' },
];

// Country-specific options

export const wallMaterial = [
  { label: 'Блюмакс', value: 'blue_max' },
  { label: 'Дерево', value: 'wood' },
  { label: 'Кирпич', value: 'brick' },
  { label: 'Блоки', value: 'block' },
  { label: 'Монолит', value: 'monolith' },
  { label: 'Канадская технология', value: 'canadian_sip' },
];

export const roofMaterial = [
  { label: 'Кровельная сталь', value: 'steel' },
  { label: 'Мягкая черепица', value: 'soft_tile' },
  { label: 'Медь', value: 'copper' },
  { label: 'Металлочерепица', value: 'metal_tile' },
  { label: 'Сланец', value: 'slate' },
  { label: 'Черепица', value: 'tile' },
  { label: 'Эксплуатируемая кровля', value: 'rooftop' },
];

export const landscapeKinds = [
  { id: 'field', title: 'Полевой' },
  { id: 'near_forest', title: 'Прилесной' },
  { id: 'near_water', title: 'Около воды' },
  { id: 'forest', title: 'Лесной' },
];

export const waterSupply = [
  { id: 'purification', title: 'Система водоочистки' },
  { id: 'central', title: 'Центральное водоснабжение' },
  { id: 'well', title: 'Скважина' },
];

export const gasSupply = [
  { id: 'without_gas', title: 'Отсутствует' },
  { id: 'gas_holder', title: 'Газгольдер' },
  { id: 'near_border', title: 'На границе' },
  { id: 'mains', title: 'Магистральный газ' },
  { id: 'diesel', title: 'Дизель' },
];

export const sewerageSupply = [
  { id: 'central', title: 'Центральная канализация' },
  { id: 'septic', title: 'Септик' },
];

export const offerKinds = [
  { value: 'purchase', label: 'Покупка' },
  { value: 'rent', label: 'Аренда' },
];

export const layoutItems = [
  [
    { value: 'wine_room', label: 'Винные' },
    { value: 'dressing_room', label: 'Гардеробные' },
    { value: 'living_room', label: 'Гостиные' },
    { value: 'childrens_room', label: 'Детские комнаты' },
    { value: 'movie_theater', label: 'Кинотеатры' },
  ],
  [
    { value: 'winter_garden', label: 'Зимние сады' },
    { value: 'game_room', label: 'Игровые' },
    { value: 'office', label: 'Кабинеты' },
    { value: 'storage', label: 'Кладовые' },
    { value: 'kitchen', label: 'Кухни' },
  ],
  [
    { value: 'staff_room', label: 'Комнаты персонала' },
    { value: 'working_kitchen', label: 'Рабочие кухни' },
    { value: 'spa_zone', label: 'СПА-зоны' },
    { value: 'dining_room', label: 'Столовые' },
    { value: 'technical_room', label: 'Технические помещения' },
  ],
  [
    { value: 'gym', label: 'Тренажёрные залы' },
    { value: 'utility_room', label: 'Хозяйственные помещения' },
    { value: 'loft', label: 'Мансарды' },
  ],
];

export const bannerStates = [
  { value: 'ordered', label: 'Заказан' },
  { value: 'active', label: 'Активный' },
  // { value: `removed`, label: `Снятый` },
  { value: 'denied', label: 'Отказано' },
];

export const floorsDescription = [
  { id: 0, title: 'Цоколь', kind: 'base' },
  { id: 1, title: '1-ый этаж', kind: 'floor', number: 1 },
  { id: 2, title: '2-ой этаж', kind: 'floor', number: 2 },
  { id: 3, title: '3-ий этаж', kind: 'floor', number: 3 },
  { id: 4, title: '4-ый этаж', kind: 'floor', number: 4 },
  { id: 5, title: 'Мансарда', kind: 'attic' },
];

export const subways = [
  { id: 85, title: 'Авиамоторная' },
  { id: 13, title: 'Автозаводская' },
  { id: 97, title: 'Академическая' },
  { id: 53, title: 'Александровский сад' },
  { id: 105, title: 'Алексеевская' },
  { id: 213, title: 'Алма-Атинская' },
  { id: 135, title: 'Алтуфьево' },
  { id: 156, title: 'Аннино' },
  { id: 50, title: 'Арбатская' },
  { id: 5, title: 'Аэропорт' },
  { id: 109, title: 'Бабушкинская' },
  { id: 57, title: 'Багратионовская' },
  { id: 71, title: 'Баррикадная' },
  { id: 47, title: 'Бауманская' },
  { id: 69, title: 'Беговая' },
  { id: 7, title: 'Белорусская' },
  { id: 93, title: 'Беляево' },
  { id: 131, title: 'Бибирево' },
  { id: 30, title: 'Библиотека им. Ленина' },
  { id: 222, title: 'Битцевский парк' },
  { id: 207, title: 'Борисово' },
  { id: 120, title: 'Боровицкая' },
  { id: 107, title: 'Ботанический сад' },
  { id: 145, title: 'Братиславская' },
  { id: 193, title: 'Бульвар Адмирала Ушакова' },
  { id: 164, title: 'Бульвар Дмитрия Донского' },
  { id: 40, title: 'Бульвар Рокоссовского' },
  { id: 195, title: 'Бунинская аллея' },
  { id: 16, title: 'Варшавская' },
  { id: 106, title: 'ВДНХ' },
  { id: 112, title: 'Владыкино' },
  { id: 2, title: 'Водный стадион' },
  { id: 3, title: 'Войковская' },
  { id: 77, title: 'Волгоградский проспект' },
  { id: 142, title: 'Волжская' },
  { id: 203, title: 'Волоколамская' },
  { id: 157, title: 'Воробьевы горы' },
  { id: 198, title: 'Выставочная' },
  { id: 218, title: 'Выставочный центр' },
  { id: 81, title: 'Выхино' },
  { id: 217, title: 'Деловой центр' },
  { id: 6, title: 'Динамо' },
  { id: 115, title: 'Дмитровская' },
  { id: 132, title: 'Добрынинская' },
  { id: 21, title: 'Домодедовская' },
  { id: 205, title: 'Достоевская' },
  { id: 140, title: 'Дубровка' },
  { id: 216, title: 'Жулебино' },
  { id: 209, title: 'Зябликово' },
  { id: 43, title: 'Измайловская' },
  { id: 94, title: 'Калужская' },
  { id: 18, title: 'Кантемировская' },
  { id: 17, title: 'Каховская' },
  { id: 15, title: 'Каширская' },
  { id: 52, title: 'Киевская' },
  { id: 74, title: 'Китай-город' },
  { id: 144, title: 'Кожуховская' },
  { id: 14, title: 'Коломенская' },
  { id: 35, title: 'Комсомольская' },
  { id: 92, title: 'Коньково' },
  { id: 226, title: 'Котельники' },
  { id: 22, title: 'Красногвардейская' },
  { id: 133, title: 'Краснопресненская' },
  { id: 36, title: 'Красносельская' },
  { id: 34, title: 'Красные ворота' },
  { id: 139, title: 'Крестьянская застава' },
  { id: 29, title: 'Кропоткинская' },
  { id: 62, title: 'Крылатское' },
  { id: 73, title: 'Кузнецкий мост' },
  { id: 79, title: 'Кузьминки' },
  { id: 60, title: 'Кунцевская' },
  { id: 48, title: 'Курская' },
  { id: 55, title: 'Кутузовская' },
  { id: 98, title: 'Ленинский проспект' },
  { id: 215, title: 'Лермонтовский проспект' },
  { id: 223, title: 'Лесопарковая' },
  { id: 32, title: 'Лубянка' },
  { id: 143, title: 'Люблино' },
  { id: 87, title: 'Марксистская' },
  { id: 204, title: 'Марьина роща' },
  { id: 146, title: 'Марьино' },
  { id: 8, title: 'Маяковская' },
  { id: 110, title: 'Медведково' },
  { id: 197, title: 'Международная' },
  { id: 117, title: 'Менделеевская' },
  { id: 196, title: 'Митино' },
  { id: 61, title: 'Молодежная' },
  { id: 202, title: 'Мякинино' },
  { id: 124, title: 'Нагатинская' },
  { id: 125, title: 'Нагорная' },
  { id: 126, title: 'Нахимовский проспект' },
  { id: 82, title: 'Новогиреево' },
  { id: 210, title: 'Новокосино' },
  { id: 11, title: 'Новокузнецкая' },
  { id: 134, title: 'Новослободская' },
  { id: 89, title: 'Новоясеневская' },
  { id: 95, title: 'Новые черемушки' },
  { id: 100, title: 'Октябрьская' },
  { id: 67, title: 'Октябрьское поле' },
  { id: 20, title: 'Орехово' },
  { id: 111, title: 'Отрадное' },
  { id: 31, title: 'Охотный Ряд' },
  { id: 12, title: 'Павелецкая' },
  { id: 28, title: 'Парк Культуры' },
  { id: 165, title: 'Парк Победы' },
  { id: 44, title: 'Партизанская' },
  { id: 42, title: 'Первомайская' },
  { id: 83, title: 'Перово' },
  { id: 113, title: 'Петровско-Разумовская' },
  { id: 141, title: 'Печатники' },
  { id: 59, title: 'Пионерская' },
  { id: 63, title: 'Планерная' },
  { id: 86, title: 'Площадь Ильича' },
  { id: 49, title: 'Площадь революции' },
  { id: 68, title: 'Полежаевская' },
  { id: 121, title: 'Полянка' },
  { id: 130, title: 'Пражская' },
  { id: 38, title: 'Преображенская площадь' },
  { id: 76, title: 'Пролетарская' },
  { id: 24, title: 'Проспект Вернадского' },
  { id: 136, title: 'Проспект Мира' },
  { id: 96, title: 'Профсоюзная' },
  { id: 72, title: 'Пушкинская' },
  { id: 214, title: 'Пятницкое шоссе' },
  { id: 1, title: 'Речной вокзал' },
  { id: 104, title: 'Рижская' },
  { id: 138, title: 'Римская' },
  { id: 228, title: 'Румянцево' },
  { id: 80, title: 'Рязанский проспект' },
  { id: 116, title: 'Савеловская' },
  { id: 229, title: 'Саларьево' },
  { id: 108, title: 'Свиблово' },
  { id: 127, title: 'Севастопольская' },
  { id: 45, title: 'Семеновская' },
  { id: 122, title: 'Серпуховская' },
  { id: 201, title: 'Славянский бульвар' },
  { id: 51, title: 'Смоленская' },
  { id: 4, title: 'Сокол' },
  { id: 37, title: 'Сокольники' },
  { id: 224, title: 'Спартак' },
  { id: 26, title: 'Спортивная' },
  { id: 206, title: 'Сретенский бульвар' },
  { id: 200, title: 'Строгино' },
  { id: 54, title: 'Студенческая' },
  { id: 102, title: 'Сухаревская' },
  { id: 64, title: 'Сходненская' },
  { id: 75, title: 'Таганская' },
  { id: 9, title: 'Тверская' },
  { id: 10, title: 'Театральная' },
  { id: 78, title: 'Текстильщики' },
  { id: 220, title: 'Телецентр' },
  { id: 91, title: 'Теплый стан' },
  { id: 227, title: 'Технопарк' },
  { id: 114, title: 'Тимирязевская' },
  { id: 88, title: 'Третьяковская' },
  { id: 225, title: 'Тропарево' },
  { id: 199, title: 'Трубная' },
  { id: 123, title: 'Тульская' },
  { id: 103, title: 'Тургеневская' },
  { id: 65, title: 'Тушинская' },
  { id: 70, title: 'Улица 1905 года' },
  { id: 219, title: 'Улица Академика Королева' },
  { id: 155, title: 'Улица Академика Янгеля' },
  { id: 194, title: 'Улица Горчакова' },
  { id: 221, title: 'Улица Милашенкова' },
  { id: 211, title: 'Улица Сергея Эйзенштейна' },
  { id: 192, title: 'Улица Скобелевская' },
  { id: 212, title: 'Улица Старокачаловская' },
  { id: 25, title: 'Университет' },
  { id: 58, title: 'Филевский парк' },
  { id: 56, title: 'Фили' },
  { id: 27, title: 'Фрунзенская' },
  { id: 19, title: 'Царицыно' },
  { id: 118, title: 'Цветной бульвар' },
  { id: 39, title: 'Черкизовская' },
  { id: 128, title: 'Чертановская' },
  { id: 119, title: 'Чеховская' },
  { id: 33, title: 'Чистые пруды' },
  { id: 137, title: 'Чкаловская' },
  { id: 99, title: 'Шаболовская' },
  { id: 208, title: 'Шипиловская' },
  { id: 84, title: 'Шоссе энтузиастов' },
  { id: 41, title: 'Щелковская' },
  { id: 66, title: 'Щукинская' },
  { id: 46, title: 'Электрозаводская' },
  { id: 23, title: 'Юго-Западная' },
  { id: 129, title: 'Южная' },
  { id: 90, title: 'Ясенево' },
];

export const currencies = Object.keys(dict.currencies).map(key => ({
  id: key,
  title: dict.currencies[key],
}));
