import { makeFilterRange } from 'helpers';

const saleMultiplier = 1000000;
const rentMultiplier = 1000;

export const mapParams = ({
  pagination = {},
  orderBy = {},
  filter = {},
  filterNot = {},
}) => {
  const { limit, offset } = pagination;
  const {
    sale = {},
    rent = {},
    salePrice = {},
    rentPrice = {},
    area = {},
    totalArea = {},
    floor = {},
    rooms = {},

    complexId,
    complexes = [],

    subLocalities = [],

    recentlyUpdated,
  } = filter;

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
      state: filter.state,
      kind: filter.kind,
      complexId: complexId || complexes.map(complex => complex.id), // get only ids from complexes[{ id, name }]
      'saleOffer.multiCurrencyPrice.usd': makeFilterRange(
        sale.min,
        sale.max,
        saleMultiplier,
      ),
      'rentOffer.multiCurrencyPrice.usd': makeFilterRange(
        rent.min,
        rent.max,
        rentMultiplier,
      ),
      'saleOffer.price': makeFilterRange(
        salePrice.min,
        salePrice.max,
        saleMultiplier,
      ),
      'rentOffer.price': makeFilterRange(
        rentPrice.min,
        rentPrice.max,
        rentMultiplier,
      ),
      'specification.area': makeFilterRange(area.min, area.max),
      'specification.totalArea': makeFilterRange(totalArea.min, totalArea.max),
      'specification.renovate': filter.renovate,
      'specification.rooms': makeFilterRange(rooms.min, rooms.max),
      'specification.floor': makeFilterRange(floor.min, floor.max),
      'specification.wcs': filter.wcs,
      'location.subLocalityId': subLocalities.map(
        sublocality => sublocality.id,
      ),
      'saleOffer.isResale': filter.isResale,
      updatedAt: recentlyUpdated ? 'now-2w..' : null,
    },
    filterNot,
  };
};
