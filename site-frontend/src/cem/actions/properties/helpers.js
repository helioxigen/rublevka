import { API } from 'core/config/resources';
import store from 'cem/store';

import fetch from 'isomorphic-fetch';

import dateformat from 'dateformat';

import { formHelpers, recursiveCleanUp } from 'cem/helpers';
const { normalizeNumber } = formHelpers;

import { makeFilterRange, makeDateRange, formatFilterDate } from 'core/helpers';

export function uploadFile(id, file, category = 'city', type = 'documents') {
  const formData = new FormData();
  formData.append('file', file[0]);

  const { auth: { token } } = store.getState();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${API}/v1/properties/${category}/${id}/${type}`, {
    method: 'post',
    headers,
    body: formData,
  }).then(response => response.headers.get('location'));
}

export const transformContract = contract => ({
  ...contract,
  validFrom: dateformat(contract.validFrom, 'isoDate'),
  validTo: dateformat(contract.validTo, 'isoDate'),
});

export const transformLocation = (location = {}, category) => ({
  ...location,
  ...(location.house ? { house: location.house.trim() } : {}),
  postalCode: normalizeNumber(location.postalCode),
  flatNumber: normalizeNumber(location.flatNumber),
  ...(category === 'city' ? { subwayIds: location.subwayIds || [] } : {}),
});

const transformComplexBuildingDetails = details => ({
  ...details,
  houseKind: details.houseKind || undefined,
  constructionStage: details.constructionStage || undefined,
  constructionKind: details.constructionKind || undefined,
  deliveryQuarter: details.deliveryQuarter || undefined,
  security: details.security || undefined,

  builtYear: normalizeNumber(details.builtYear),
  stage: normalizeNumber(details.stage),
  floors: normalizeNumber(details.floors),

  elevators: normalizeNumber(details.elevators),
  freightElevators: normalizeNumber(details.freightElevators),

  withParkings: details.withParkings === 'true',
  withUndergroundGarages: details.withUndergroundGarages === 'true',
  parkings: normalizeNumber(details.parkings),
  undergroundGarages: normalizeNumber(details.undergroundGarages),
  withRubbishChute: details.withRubbishChute === 'true',
  withWasteDisposalRoom: details.withWasteDisposalRoom === 'true',
});

export const transformComplexBuilding = (complex) => {
  const cleanComplex = recursiveCleanUp(complex);
  return cleanComplex ? transformComplexBuildingDetails(cleanComplex) : {};
};

// TODO Use regular normalization mechanism from 'redux-form' (as it gets fixed, of course)
export const transformProperty = (property, category) => {
  const values = recursiveCleanUp(property);

  values.category = category;

  if (values.complexBuildingDetails) {
    values.complexBuildingDetails = transformComplexBuilding(values.complexBuildingDetails);
  }
  if (values.saleOffer) {
    if (values.saleOffer.isAgentFixed === 'true' && values.saleOffer.agentFixedPrice) {
      values.saleOffer.isAgentFixed = values.saleOffer.isAgentFixed === 'true';
      values.saleOffer.agentFee = undefined;
      values.saleOffer.agentFixedPrice.price = normalizeNumber(
        values.saleOffer.agentFixedPrice.price,
      );
    } else {
      values.saleOffer.agentFixedPrice = undefined;
    }
    values.saleOffer.agentFee = normalizeNumber(values.saleOffer.agentFee);
    values.saleOffer.price = normalizeNumber(values.saleOffer.price);
    values.saleOffer.isBargain = values.saleOffer.isBargain === 'true';
    values.saleOffer.isInstallment = values.saleOffer.isInstallment === 'true';
    values.saleOffer.isMortgage = values.saleOffer.isMortgage === 'true';
    values.saleOffer.isResale = values.saleOffer.isResale === 'true';
    values.saleOffer.isDisabled = values.saleOffer.isDisabled === 'true';
  } else {
    values.saleOffer = undefined;
  }

  if (values.rentOffer) {
    if (values.rentOffer.isAgentFixed === 'true' && values.rentOffer.agentFixedPrice) {
      values.rentOffer.isAgentFixed = values.rentOffer.isAgentFixed === 'true';
      values.rentOffer.agentFee = undefined;
      values.rentOffer.agentFixedPrice.price = normalizeNumber(
        values.rentOffer.agentFixedPrice.price,
      );
    } else {
      values.rentOffer.agentFixedPrice = undefined;
    }
    values.rentOffer.agentFee = normalizeNumber(values.rentOffer.agentFee);
    values.rentOffer.isAgentFixed = undefined;
    values.rentOffer.price = normalizeNumber(values.rentOffer.price);
    values.rentOffer.isAllowedChildren = values.rentOffer.isAllowedChildren === 'true';
    values.rentOffer.isAllowedPets = values.rentOffer.isAllowedPets === 'true';
    values.rentOffer.isDisabled = values.rentOffer.isDisabled === 'true';
  } else {
    values.rentOffer = undefined;
  }

  values.specification = values.specification || {};

  // TODO Switch to separate functions for these
  // City-specific transforms
  if (values.category === 'city') {
    if (!values.specification.isOpenLayout) {
      values.specification.isOpenLayout = false;
    }
    if (!values.specification.withBalcony) {
      values.specification.withBalcony = false;
    }
    if (!values.specification.withLoggia) {
      values.specification.withLoggia = false;
    }

    values.specification.balconies = normalizeNumber(values.specification.balconies);
    values.specification.loggias = normalizeNumber(values.specification.loggias);

    values.specification.ceilHeight = normalizeNumber(values.specification.ceilHeight);
    values.specification.floor = normalizeNumber(values.specification.floor);
    values.specification.livingArea = normalizeNumber(values.specification.livingArea);
    values.specification.totalArea = normalizeNumber(values.specification.totalArea);
    values.specification.rooms = normalizeNumber(values.specification.rooms);
    values.specification.wcs = normalizeNumber(values.specification.wcs);
    values.specification.bedrooms = normalizeNumber(values.specification.bedrooms);

    values.specification.panoramicGlazing = values.specification.panoramicGlazing === 'true';
  }

  // Country-specific transforms
  if (values.category === 'country') {
    values.specification.withConditioning = values.specification.withConditioning === 'true';
    values.specification.withVentilation = values.specification.withVentilation === 'true';

    values.specification.bedrooms = normalizeNumber(values.specification.bedrooms);
    values.specification.area = normalizeNumber(values.specification.area);
    values.specification.builtYear = normalizeNumber(values.specification.builtYear);
    values.specification.floors = normalizeNumber(values.specification.floors);
    values.specification.loggias = normalizeNumber(values.specification.loggias);
    values.specification.balconies = normalizeNumber(values.specification.balconies);
    values.specification.elevators = normalizeNumber(values.specification.elevators);
    values.specification.ceilingHeight = normalizeNumber(values.specification.ceilingHeight);

    values.additionalDetails = values.additionalDetails || {};
    values.additionalDetails.securityHouseArea = normalizeNumber(
      values.additionalDetails.securityHouseArea,
    );
    values.additionalDetails.spaArea = normalizeNumber(values.additionalDetails.spaArea);
    values.additionalDetails.guestHouseArea = normalizeNumber(
      values.additionalDetails.guestHouseArea,
    );
    values.additionalDetails.staffHouseArea = normalizeNumber(
      values.additionalDetails.staffHouseArea,
    );
    values.additionalDetails.parkingArea = normalizeNumber(values.additionalDetails.parkingArea);
    values.additionalDetails.garageArea = normalizeNumber(values.additionalDetails.garageArea);
    values.additionalDetails.bathhouseArea = normalizeNumber(
      values.additionalDetails.bathhouseArea,
    );

    values.landDetails = values.landDetails || {};
    values.landDetails.landscaping = values.landDetails.landscaping === 'true';

    values.landDetails.area = normalizeNumber(values.landDetails.area);

    values.landDetails.landscapeKind = values.landDetails.landscapeKind || [];

    values.communication = values.communication || {};
    values.communication.powerSupply = normalizeNumber(values.communication.powerSupply);

    values.specification.legacyLayouts = values.specification.legacyLayouts || [];
    values.specification.layouts = values.specification.layouts || {};
  }

  values.location = transformLocation(values.location, category);

  values.isResidentialComplex = undefined;
  if (!values.equipment) values.equipment = [];
  if (!values.information) values.information = {};

  return values;
};

export const transformComplexBuildingDetailsIn = complex => ({
  ...complex,
  withParkings: complex.parkings ? 'true' : 'false',
  withUndergroundGarages: complex.undergroundGarages ? 'true' : 'false',
  withRubbishChute: complex.withRubbishChute ? 'true' : 'false',
  withWasteDisposalRoom: complex.withWasteDisposalRoom ? 'true' : 'false',
});

// TODO: FIXME
export const transformIn = (property) => {
  const values = { ...property };

  if (values.saleOffer) {
    values.saleOffer.isAgentFixed = String(
      !!values.saleOffer.agentFixedPrice && !!Object.keys(values.saleOffer.agentFixedPrice).length,
    );
    values.saleOffer.agentFee = normalizeNumber(values.saleOffer.agentFee);

    values.saleOffer.isBargain = values.saleOffer.isBargain ? 'true' : 'false';
    values.saleOffer.isInstallment = values.saleOffer.isInstallment ? 'true' : 'false';
    values.saleOffer.isMortgage = values.saleOffer.isMortgage ? 'true' : 'false';
    values.saleOffer.isDisabled = values.saleOffer.isDisabled ? 'true' : 'false';
    if (values.saleOffer.isResale !== undefined && values.isResale !== null) {
      values.saleOffer.isResale = values.saleOffer.isResale ? 'true' : 'false';
    }
  }

  if (values.complexBuildingDetails) {
    values.complexBuildingDetails = transformComplexBuildingDetailsIn(
      values.complexBuildingDetails,
    );
  }

  if (values.rentOffer) {
    values.rentOffer.isAgentFixed = String(
      !!values.rentOffer.agentFixedPrice && !!Object.keys(values.rentOffer.agentFixedPrice).length,
    );
    values.rentOffer.agentFee = normalizeNumber(values.rentOffer.agentFee);

    values.rentOffer.isAllowedChildren = values.rentOffer.isAllowedChildren ? 'true' : 'false';
    values.rentOffer.isAllowedPets = values.rentOffer.isAllowedPets ? 'true' : 'false';
    values.rentOffer.isDisabled = values.rentOffer.isDisabled ? 'true' : 'false';
  }

  if (values.category === 'country') {
    if (values.specification) {
      values.specification.withConditioning = values.specification.withConditioning
        ? 'true'
        : 'false';
      values.specification.withVentilation = values.specification.withVentilation
        ? 'true'
        : 'false';
    }

    if (values.landDetails) {
      values.landDetails.landscaping = values.landDetails.landscaping ? 'true' : 'false';
    }
  } else if (values.category === 'city') {
    if (values.specification) {
      values.specification.panoramicGlazing = values.specification.panoramicGlazing
        ? 'true'
        : 'false';
    }
  }

  return values;
};

const makeMultiCurrencyFilter = (currency, dealType, valueFrom, valueTo) => {
  const filterValue = makeFilterRange(valueFrom, valueTo);
  return currency
    ? {
      [`${dealType}Offer.multiCurrencyPrice.${currency.toLowerCase()}`]: filterValue,
    }
    : {};
};

export const mapFilter = (filter) => {
  const {
    dealType,
    location,
    totalAreaFrom,
    totalAreaTo,
    livingAreaFrom,
    livingAreaTo,
    roomsFrom,
    roomsTo,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    levelsFrom,
    levelsTo,
    areaFrom,
    areaTo,
    builtYearFrom,
    builtYearTo,
    landAreaFrom,
    landAreaTo,
    bedroomsFrom,
    bedroomsTo,
    mkadFrom,
    mkadTo,
    priceFilterCurrency,
    priceFilterFrom,
    priceFilterTo,
    ...params
  } = filter;

  const locationFields = ['location.localityName', 'location.subLocalityName', 'location.street'];

  return {
    ...params,
    [locationFields.join(',')]: location ? `*${location}*` : undefined,
    ...makeMultiCurrencyFilter(priceFilterCurrency, dealType, priceFilterFrom, priceFilterTo),
    'location.mkadDistance': makeFilterRange(mkadFrom, mkadTo),
    'saleOffer.price': dealType === 'sale' ? '1..' : undefined,
    'rentOffer.price': dealType === 'rent' ? '1..' : undefined,
    'specification.area': makeFilterRange(areaFrom, areaTo),
    'landDetails.area': makeFilterRange(landAreaFrom, landAreaTo),
    'specification.builtYear': makeFilterRange(builtYearFrom, builtYearTo),
    'specification.floors': makeFilterRange(levelsFrom, levelsTo),
    'specification.bedrooms': makeFilterRange(bedroomsFrom, bedroomsTo),
    'specification.totalArea': makeFilterRange(totalAreaFrom, totalAreaTo),
    'specification.livingArea': makeFilterRange(livingAreaFrom, livingAreaTo),
    'specification.rooms': makeFilterRange(roomsFrom, roomsTo),
    createdAt: makeDateRange(
      createdFrom && formatFilterDate(createdFrom),
      createdTo && formatFilterDate(createdTo),
    ),
    updatedAt: makeDateRange(
      updatedFrom && formatFilterDate(updatedFrom),
      updatedTo && formatFilterDate(updatedTo),
    ),
  };
};
