const saleFields = {
  'saleOffer.price': { title: 'Цена продажи' },
  'saleOffer.currency': { title: 'Валюта продажи' },
  'saleOffer.agentFee': { title: 'Комиссия', messageKind: 'agentFee' },
  'saleOffer.agentFixedPrice': { title: 'Комиссия', messageKind: 'fixedPrice' },
  'saleOffer.agentFixedPrice.price': { title: 'Комиссия' },
  'saleOffer.agentFixedPrice.currency': { title: 'Комиссия' },
  'saleOffer.kind': { title: 'Тип сделки', dictionaryKey: 'saleKinds' },
  'saleOffer.isResale': { title: 'Перепродажа' },
  'saleOffer.isBargain': { title: 'Торг' },
  'saleOffer.isMortgage': { title: 'Ипотека' },
  'saleOffer.isInstallment': { title: 'Рассорчка' },
};

const rentFields = {
  'rentOffer.price': { title: 'Цена аренды' },
  'rentOffer.currency': { title: 'Валюта аренды' },
  'rentOffer.agentFee': { title: 'Комиссия', messageKind: 'agentFee' },
  'rentOffer.agentFixedPrice': { title: 'Комиссия', messageKind: 'fixedPrice' },
  'rentOffer.agentFixedPrice.price': { title: 'Комиссия' },
  'rentOffer.agentFixedPrice.currency': { title: 'Комиссия' },
  'rentOffer.deposit': { title: 'Депозит' },
  'rentOffer.period': { title: 'Период аренды', dictionaryKey: 'periods' },
  'rentOffer.isAllowedPets': { title: 'Можно с животными' },
  'rentOffer.isAllowedChildren': { title: 'Можно с детьми' },
};

const specificationFields = {
  'specification.ceilHeight': { title: 'Высота потолка' },
  'specification.totalArea': { title: 'Общая площадь' },
  'specification.livingArea': { title: 'Жилая площадь' },
  'specification.rooms': { title: 'Количество комнат' },
  'specification.wcs': { title: 'Количество санузлов' },
  'specification.loggias': { title: 'Количество лоджий' },
  'specification.balconies': { title: 'Количество балконов' },
  'specification.floor': { title: 'Этаж' },
  'specification.windows': { title: 'Вид из окон', dictionaryKey: 'windows' },
  'specification.bedrooms': { title: 'Количество спален' },
  'specification.area': { title: 'Площадь' },
  'specification.wallMaterial': {
    title: 'Материал стен',
    dictionaryKey: 'wallMaterials',
  },
  'specification.roofMaterial': {
    title: 'Материал крыши',
    dictionaryKey: 'roofMaterials',
  },
  'specification.builtYear': { title: 'Год постройки' },
  'specification.floors': { title: 'Количество этажей' },
  'specification.elevators': { title: 'Количество лифтов' },
  'specification.ceilingHeight': { title: 'Высота потолка' },
  'specification.withConditioning': { title: 'Кондиционер' },
  'specification.withVentilation': { title: 'Вентиляция' },
  'specification.renovate': { title: 'Ремонт', dictionaryKey: 'renovateKinds' },
  'specification.condition': {
    title: 'Состояние',
    dictionaryKey: 'conditions',
  },
  'specification.furniture': {
    title: 'Мебель',
    dictionaryKey: 'furnitureKinds',
  },
  'specification.layout': { title: 'Планировка', dictionaryKey: 'layouts' },
  'specification.legacyLayouts': { title: 'Поэтажное описание', ignore: true },
  'specification.legacyLayouts.items': {
    title: 'Поэтажное описание',
    dictionaryKey: 'layouts',
    messageKind: 'floorDescrption',
    ignoreEvents: ['moved'],
    ignore: true,
  },
  'specification.layouts.wine_room': { title: 'Винные, кол-во' },
  'specification.layouts.dressing_room': { title: 'Гардеробные' },
  'specification.layouts.living_room': { title: 'Гостиные' },
  'specification.layouts.childrens_room': { title: 'Детские комнаты' },
  'specification.layouts.movie_theater': { title: 'Кинотеатры' },
  'specification.layouts.winter_garden': { title: 'Зимние сады' },
  'specification.layouts.game_room': { title: 'Игровые' },
  'specification.layouts.office': { title: 'Кабинеты' },
  'specification.layouts.storage': { title: 'Кладовые' },
  'specification.layouts.kitchen': { title: 'Кухни' },
  'specification.layouts.staff_room': { title: 'Комнаты персонала' },
  'specification.layouts.working_kitchen': { title: 'Рабочие кухни' },
  'specification.layouts.spa_zone': { title: 'СПА-зоны' },
  'specification.layouts.dining_room': { title: 'Столовые' },
  'specification.layouts.technical_room': { title: 'Технические помещения' },
  'specification.layouts.gym': { title: 'Тренажёрные залы' },
  'specification.layouts.utility_room': { title: 'Хозяйственные помещения' },
  'specification.layouts.loft': { title: 'Мансарды' },
};

const informationFields = {
  'information.renovate': { title: 'Ремонт', dictionaryKey: 'renovateKinds' },
  'information.conditioning': { title: 'Кондиционирование' },
  'information.condition': { title: 'Состояние', dictionaryKey: 'conditions' },
  'information.furniture': { title: 'Мебель', dictionaryKey: 'furnitureKinds' },
  'information.ventilation': { title: 'Вентиляция' },
};

const residentialComplexFields = {
  'residentialComplex.name': { title: 'Название ЖК' },
  'residentialComplex.state': { title: 'Статус ЖК' },
  'residentialComplex.details.series': { title: 'Серия' },
  'residentialComplex.details.stage': { title: 'Очередь строительства' },
  'residentialComplex.details.houseKind': { title: 'Тип дома' },
  'residentialComplex.details.security': { title: 'Охрана' },
  'residentialComplex.details.constructionKind': { title: 'Конструкция дома' },
  'residentialComplex.details.floors': { title: 'Количество этажей' },
  'residentialComplex.details.builtYear': { title: 'Год постройки дома' },
  'residentialComplex.details.deliveryQuarter': { title: 'Квартал сдачи' },
  'residentialComplex.details.constructionStage': {
    title: 'Стадия строительства',
  },
  'residentialComplex.details.elevators': { title: 'Количество лифтов' },
  'residentialComplex.details.freightElevators': {
    title: 'Количество грузовых лифтов',
  },
  'residentialComplex.details.parkings': {
    title: 'Количество парковочных мест',
  },
  'residentialComplex.details.undergroundGarages': {
    title: 'Количество подземных гаражей',
  },
};

const locationFields = {
  'location.countryId': { ignore: true },
  'location.countryName': { title: 'Страна' },
  'location.regionId': { ignore: true },
  'location.regionName': { title: 'Регион' },
  'location.localityId': { ignore: true },
  'location.localityName': { title: 'Область' },
  'location.subLocalityId': { ignore: true },
  'location.subLocalityName': { title: 'Район (область)' },
  'location.latitude': { title: 'Широта' },
  'location.longitude': { title: 'Долгота' },
  'location.settlementId': { ignore: true },
  'location.settlementName': { title: 'Посёлок' },
  'location.routeId': { ignore: true },
  'location.routeName': { title: 'Шоссе' },
  'location.mkadDistance': { title: 'Расстояние от МКАД' },
  'location.districtId': { ignore: true },
  'location.districtName': { title: 'Район' },
  'location.house': { title: 'Номер дома' },
  'location.street': { title: 'Улица' },
};

const landDetailsFields = {
  'landDetails.landscaping': { title: 'Ландшафтные работы' },
  'landDetails.landscapeKind': {
    title: 'Тип участка',
    dictionaryKey: 'landscapeKinds',
  },
  'landDetails.area': { title: 'Площать участка' },
};

const additionalDetailsFields = {
  'additionalDetails.securityHouseArea': { title: 'Дом охраны' },
  'additionalDetails.spaArea': { title: 'СПА-комплекс' },
  'additionalDetails.guestHouseArea': { title: 'Гостевой дом' },
  'additionalDetails.staffHouseArea': { title: 'Дом персонала' },
  'additionalDetails.parkingArea': { title: 'Парковка' },
  'additionalDetails.garageArea': { title: 'Гараж' },
  'additionalDetails.bathhouseArea': { title: 'Баня' },
};

const communicationFields = {
  'communication.powerSupply': { title: 'Электричество' },
  'communication.waterSupply': { title: 'Водопровод' },
  'communication.gasSupply': { title: 'Газ', dictionaryKey: 'gasSupply' },
  'communication.sewerageSupply': { title: 'Канализация' },
};

const commonFields = {
  category: { title: 'Категория' },
  kind: { title: 'Тип' },
  state: { title: 'Статус' },
  equipment: {
    title: 'Оборудование',
    dictionaryKey: 'equipment',
    declensionForms: ['предмет', 'предмета', 'предметов'],
  },
  note: { title: 'Примечание' },
  images: {
    title: 'Фотографии',
    declensionForms: ['фотография', 'фотографии', 'фотографий'],
    messageKind: 'image',
  },
  layoutImages: {
    title: 'Планировки',
    declensionForms: ['планировка', 'планировки', 'планировок'],
    messageKind: 'image',
  },
  zipalPackageIds: {
    title: 'Пакеты выгрузки в Zipal',
    declensionForms: ['пакет', 'пакета', 'пакетов'],
  },
  saleOffer: { title: 'Условия продажи', messageKind: 'offer' },
  rentOffer: { title: 'Условия аренды', messageKind: 'offer' },
  residentialComplexId: {
    title: 'Жилищный комплекс',
    messageKind: 'residentialComplex',
  },
};

const contactFields = {
  linkedContactId: { title: 'Связанный контакт' },
  phoneNumber: { title: 'Номер' },
  kindId: { title: 'Кем является' },
};

const imagesFields = {
  'images.isPublic': {
    title: 'Фотография на сайте',
    messageKind: 'imageIsPublic',
  },
};

const layoutFields = {
  'layoutImages.isPublic': {
    title: 'Планировка на сайте',
    messageKind: 'imageIsPublic',
  },
};

export const ignoredFields = [
  'updatedAt',
  'clientLeadId',
  'createdByUserId',
  'updatedByUserId',
  'id',
  'category',
  'createdAt',
  'updatedAt',
];

export default {
  ...saleFields,
  ...rentFields,
  ...specificationFields,
  ...informationFields,
  ...residentialComplexFields,
  ...locationFields,
  ...landDetailsFields,
  ...additionalDetailsFields,
  ...communicationFields,
  ...commonFields,
  ...contactFields,
  ...imagesFields,
  ...layoutFields,
};
