import { makeFilterRange } from '../jq-redux-api/helpers';

const saleMultiplier = 1000000;
const rentMultiplier = 1000;

// eslint-disable-next-line import/prefer-default-export
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
    mkadDistance = {},
    bedrooms = {},
    bedroomsFrom,
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

    state,
    kind,
    id,
    renovate,
    furniture,
    wallMaterial,

    landArea = {},
    landscapeKind,

    isResale,
    salePrice,
    rentPrice,
    currency,
    ...rest
  } = filter;

  // eslint-disable-next-line no-console
  if (Object.keys(rest).length > 0) console.warn('not whitelisted keys', rest);

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy: {
      [orderBy.field]: orderBy.predicate,
    },
    filter: {
      state,
      kind,
      id,

      'location.routeId': routeIds || routes.map(route => route.id),
      'location.districtId':
        districtId || districts.map(district => district.id),
      'location.localityId':
        localityId || localities.map(locality => locality.id),
      'location.settlementId':
        settlementId || settlements.map(settlement => settlement.id),
      'location.mkadDistance': makeFilterRange(
        mkadDistance.min,
        mkadDistance.max,
      ),

      'landDetails.area': makeFilterRange(landArea.min, landArea.max),
      'landDetails.landscapeKind': landscapeKind,

      'specification.bedrooms': makeFilterRange(
        bedroomsFrom || bedrooms.min,
        bedrooms.max,
      ),
      'specification.wcs': makeFilterRange(wcs.min, wcs.max),
      'specification.area': makeFilterRange(area.min, area.max),
      'specification.renovate': renovate,
      'specification.furniture': furniture,
      'specification.wallMaterial': wallMaterial,

      'saleOffer.isResale': isResale,
      'saleOffer.price': salePrice,
      'rentOffer.price': rentPrice,
      [`saleOffer.multiCurrencyPrice.${currency}`]: makeFilterRange(
        sale.min,
        sale.max,
        saleMultiplier,
      ),
      [`rentOffer.multiCurrencyPrice.${currency}`]: makeFilterRange(
        rent.min,
        rent.max,
        rentMultiplier,
      ),
      // [sale.currencyPrice]: makeFilterRange(sale.min, sale.max, saleMultiplier),
      // [rent.currencyPrice]: makeFilterRange(rent.min, rent.max, rentMultiplier),

      updatedAt: recentlyUpdated ? 'now-2w..' : null,
    },
    filterNot: {
      'saleOffer.isDisabled': filterNot.isSaleDisabled,
      'rentOffer.isDisabled': filterNot.isRentDisabled,
    },
  };
};
