import { makeFilterRange } from 'site/helpers';

const saleMultiplier = 1000000;
// const rentMultiplier = 1000;

const mapRooms = (rooms = []) => {
  const has4 = (rooms.indexOf(4) > -1);

  const toFilter = has4 ? [] : rooms.filter(room => room !== 4);
  const toFilterNot = has4 ? rooms.filter(room => room !== 4) : [];

  return {
    toFilter,
    toFilterNot,
  };
};

export const mapParams = ({ pagination = {}, orderBy = {}, filter = {}, filterNot = {} }) => {
  const { limit, offset } = pagination;
  const {
    sale = {},
    area = {},
    subLocalityId,
    subLocalities = [],
  } = filter;

  const rooms = mapRooms(filter.rooms);

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy: {
      [orderBy.field]: orderBy.predicate,
    },
    filter: {
      id: filter.id,
      name: filter.name ? `*${filter.name.trim()}*` : null,
      state: filter.state,
      'location.subLocalityId': subLocalityId || subLocalities.map(subLocality => subLocality.id),

      'properties.specification.totalArea': makeFilterRange(area.min, area.max),
      'properties.specification.rooms': rooms.toFilter,

      'buildings.details.constructionStage': filter.constructionStage,
      'buildings.details.constructionKind': filter.constructionKind,
      'buildings.details.undergroundGarages': filter.undergroundGarages ? '0..' : null,
      'buildings.details.parkings': filter.parkings ? '0..' : null,

      'statistics.price.from.usd': makeFilterRange(sale.min, undefined, saleMultiplier),
      'statistics.price.to.usd': makeFilterRange(undefined, sale.max, saleMultiplier),
    },
    filterNot: {
      ...filterNot,
      'properties.specification.rooms': rooms.toFilterNot,
    },
  };
};
