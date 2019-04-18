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
    localityIds,
    localities = [],

    districtId,
    districtIds,
    districts = [],

    settlementId,
    settlementIds,
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
    dealType,
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
        districtIds || districtId || districts.map(district => district.id),
      'location.localityId':
        localityIds || localityId || localities.map(locality => locality.id),
      'location.settlementId':
        settlementIds
        || settlementId
        || settlements.map(settlement => settlement.id),
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
      'rentOffer.price': (dealType === 'rent' && '0..') || rentPrice,
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

function parseBoolean(value) {
  if (value === true || String(value).toLowerCase() === 'true' || value === 1) {
    return true;
  }
  return false;
}

function transformOutputImage(image) {
  const { id, isPublic } = image;
  return { id, isPublic };
}

function transformOutputLocation(location) {
  const {
    districtName,
    house,
    latitude,
    localityName,
    longitude,
    mkadDistance,
    routeName,
    settlementId,
    settlementName,
    street,
  } = location;
  return {
    districtName,
    house,
    latitude,
    localityName,
    longitude,
    mkadDistance,
    routeName,
    settlementId,
    settlementName,
    street,
  };
}

function transformOutputRentOffer(offer) {
  const {
    agentFee,
    currency,
    deposit,
    isAllowedChildren,
    isAllowedPets,
    isDisabled,
    period,
    price,
  } = offer || {};
  return {
    agentFee,
    currency,
    deposit,
    isAllowedChildren: parseBoolean(isAllowedChildren),
    isAllowedPets: parseBoolean(isAllowedPets),
    isDisabled: parseBoolean(isDisabled),
    period,
    price,
  };
}

function transformOutputSaleOffer(offer) {
  const {
    agentFee,
    currency,
    isAgentFixed,
    agentFixedPrice,
    isBargain,
    isDisabled,
    isInstallment,
    isMortgage,
    isResale,
    kind,
    price,
  } = offer || {};
  return {
    agentFee,
    currency,
    isAgentFixed: parseBoolean(isAgentFixed),
    agentFixedPrice,
    isBargain: parseBoolean(isBargain),
    isDisabled: parseBoolean(isDisabled),
    isInstallment: parseBoolean(isInstallment),
    isMortgage: parseBoolean(isMortgage),
    isResale: parseBoolean(isResale),
    kind,
    price,
  };
}

function transfortOutputSpecification(specification) {
  const {
    area,
    rooms,
    bedrooms,
    ceilingHeight,
    withConditioning,
    withVentilation,
  } = specification;
  return {
    ...specification,
    area: parseFloat(area),
    rooms: parseFloat(rooms),
    bedrooms: parseFloat(bedrooms),
    ceilingHeight: parseFloat(ceilingHeight),
    withConditioning: parseBoolean(withConditioning),
    withVentilation: parseBoolean(withVentilation),
  };
}

export function transformOutputValues(property) {
  const {
    additionalDetails,
    category,
    communication,
    equipment,
    images,
    kind,
    landDetails,
    layoutImages,
    location,
    rentOffer,
    saleOffer,
    specification,
    state,
  } = property;
  return {
    additionalDetails,
    category,
    communication,
    equipment,
    images: images.map(image => transformOutputImage(image)),
    kind,
    landDetails,
    layoutImages,
    location: transformOutputLocation(location),
    rentOffer: transformOutputRentOffer(rentOffer),
    saleOffer: transformOutputSaleOffer(saleOffer),
    specification: transfortOutputSpecification(specification),
    state,
  };
}
