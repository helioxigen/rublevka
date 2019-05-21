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
    house,

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
      // [orderBy.field]: orderBy.predicate,
      ...orderBy,
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
      'location.house': house,
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
  if (typeof value === 'undefined') {
    return value;
  }
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
    settlementId, street, house, cadastralNumber,
  } = location;
  return {
    settlementId,
    street,
    house,
    cadastralNumber,
  };
}

function transformOutputRentOffer(offer) {
  if (!offer) {
    return null;
  }
  const {
    agentFee,
    currency,
    deposit,
    isAllowedChildren,
    isAllowedPets,
    isDisabled,
    period,
    price,
    isAgentFixed,
    agentFixedPrice,
  } = offer;
  return {
    agentFee,
    currency,
    deposit,
    isAllowedChildren: parseBoolean(isAllowedChildren),
    isAllowedPets: parseBoolean(isAllowedPets),
    isDisabled: parseBoolean(isDisabled),
    period,
    price: parseFloat(price) || 0,
    isAgentFixed,
    agentFixedPrice,
  };
}

function transformOutputSaleOffer(offer) {
  if (!offer) {
    return null;
  }
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
  } = offer;
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
    price: parseFloat(price) || 0,
    kind,
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
function transformOutputCommunication(communication) {
  const { powerSupply } = communication;
  return {
    ...communication,
    powerSupply: parseFloat(powerSupply) || 0,
  };
}

export function isContainsInvalidPrice(value) {
  const keys = Object.keys(value || {});
  const numKeys = keys.length;
  const requriedFields = ['price', 'currency'];
  const isContainsRequiriedFields = requriedFields.every(
    field => !!keys.includes(field),
  );

  if (!isContainsRequiriedFields && numKeys > 0) {
    return true;
  }

  return false;
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
    note,
  } = property;
  return {
    additionalDetails,
    category,
    communication: transformOutputCommunication(communication),
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
    note,
  };
}
