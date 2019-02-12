import { makeFilterRange } from 'site/helpers';

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
    area = {},
    landArea = {},
    mkadDistance = {},
    bedrooms = {},
    wcs = {},

    routeIds,
    routes = [],

    localityId,
    localities = [],

    districtId,
    districts = [],

    settlementId,
    settlements = [],

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
      state: filter.state,
      kind: filter.kind,
      id: filter.id,
      [sale.currencyPrice]: makeFilterRange(sale.min, sale.max, saleMultiplier),
      [rent.currencyPrice]: makeFilterRange(rent.min, rent.max, rentMultiplier),
      'specification.area': makeFilterRange(area.min, area.max),
      'landDetails.area': makeFilterRange(landArea.min, landArea.max),
      'specification.renovate': filter.renovate,
      'location.mkadDistance': makeFilterRange(
        mkadDistance.min,
        mkadDistance.max,
      ),

      'location.routeId': routeIds || routes.map(route => route.id),
      'location.districtId':
        districtId || districts.map(district => district.id),
      'location.localityId':
        localityId || localities.map(locality => locality.id),
      'location.settlementId':
        settlementId || settlements.map(settlement => settlement.id),

      'specification.bedrooms': makeFilterRange(bedrooms.min, bedrooms.max),
      'specification.wcs': makeFilterRange(wcs.min, wcs.max),

      'saleOffer.isResale': filter.isResale,

      'saleOffer.price': filter.salePrice,
      'rentOffer.price': filter.rentPrice,

      updatedAt: recentlyUpdated ? 'now-2w..' : null,
    },
    filterNot: {
      'saleOffer.isDisabled': filterNot.isSaleDisabled,
      'rentOffer.isDisabled': filterNot.isRentDisabled,
    },
  };
};
