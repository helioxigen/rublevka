const { toPairs } = require('ramda');
const {
  gasSupply,
  landscapeKinds,
  roofMaterials,
  sewerageSupply,
  wallMaterials,
  waterSupply,
  roomsLayout,
  offerKinds,
} = require('./dictionaries');

const getCommunications = communication => `Коммуникации: ${gasSupply[communication.gasSupply]}, ${
  waterSupply[communication.waterSupply]
}, ${sewerageSupply[communication.sewerageSupply]}, Электричество ${
  communication.powerSupply
}.00 квт.`;

const getOfferKind = item => offerKinds[item.offerKind];

const buildLayout = layout => toPairs(layout) // Object.entries
  .reduce((acc, [room, count]) => {
    const res = roomsLayout[room];

    if (count > 1) {
      return acc.concat(res).concat(` (${count} шт.), `);
    }

    return acc.concat(res).concat(', ');
  }, 'В доме: ')
  .slice(0, -2)
  .concat('.');

const getHomeLayout = ({ layouts = {} }) => (Object.keys(layouts).length > 0 ? buildLayout(layouts) : '');

const getHouseDigest = item => `${getOfferKind(item)} загородного дома в коттеджном посёлке "${
  item.location.settlementName
}", ${item.location.routeName} шоссе, ${
  item.location.mkadDistance
} км. от МКАД. Дом под ключ ${item.specification.area} м² на участке ${
  item.landDetails.area
} соток. Тип участка: ${
  landscapeKinds[item.landDetails.landscapeKind[0]]
}. Конструкция дома: ${
  wallMaterials[item.specification.wallMaterial]
}. Количество уровней: ${item.specification.floors}. Материал крыши: ${
  roofMaterials[item.specification.roofMaterial]
}.`;

exports.getHouseDescription = item => `${getHouseDigest(item)} ${getHomeLayout(
  item.specification,
)} ${getCommunications(item.communication)} Номер объекта: ${item.id}.`;

exports.getLandDescription = item => `${getOfferKind(item)} земельного участка в коттеджном посёлке "${
  item.location.settlementName
}", ${item.location.routeName} шоссе, ${
  item.location.mkadDistance
} км. от МКАД. Площадь участка: ${
  item.landDetails.area
} соток. Тип участка: ${
  landscapeKinds[item.landDetails.landscapeKind[0]]
}. ${getCommunications(item.communication)} Номер объекта: ${item.id}.`;

exports.getImageLink = id => `https://images.jqestate.ru/${id}-rublevka-1024`;

exports.getPublishServices = (item) => {
  const Services = [];

  if (item.premium) {
    Services.push({ ServicesEnum: 'premium' });
  }
  if (item.top3) {
    Services.push({ ServicesEnum: 'top3' });
  }

  return Services;
};
