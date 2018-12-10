import { formHelpers, recursiveCleanUp } from 'cem/helpers';
const { normalizeNumber } = formHelpers;

const transformLocation = (location) => {
  if (location) {
    return {
      ...location,
      postalCode: normalizeNumber(location.postalCode),
      subwayIds: location.subwayIds || [],
    };
  }
};

const transformAdjacentTerritory = (adjacentTerritory) => ({
  ...adjacentTerritory,
  isAccessOpen: adjacentTerritory.isAccessOpen === `true`,
  isAllowedCars: adjacentTerritory.isAllowedCars === `true`,
  isGreeneryPlanted: adjacentTerritory.isGreeneryPlanted === `true`,
});

export const transformDataOut = (data) => {
  const values = recursiveCleanUp(data);

  return {
    ...values,
    location: transformLocation(values.location),
    linkedContactIds: data.linkedContactIds || [],
    accreditors: data.accreditors || [],
    adjacentTerritory: values.adjacentTerritory ? transformAdjacentTerritory(values.adjacentTerritory) : {},
    purchaseTimeConditions: data.purchaseTimeConditions || undefined,
    keysIssueDate: data.keysIssueDate && data.keysIssueDate.split(`T`)[0],
  };
};

export const transformDataIn = (data) => ({
  ...data,
  adjacentTerritory: {
    ...data.adjacentTerritory,
    isAccessOpen: data.adjacentTerritory.isAccessOpen ? `true` : `false`,
    isAllowedCars: data.adjacentTerritory.isAllowedCars ? `true` : `false`,
    isGreeneryPlanted: data.adjacentTerritory.isGreeneryPlanted ? `true` : `false`,
  },
});


const makeStatsPriceFilter = (currency, priceFrom, priceTo) => {
  if (currency && (priceFrom || priceTo)) {
    return {
      [`statistics.price.from.${currency.toLowerCase()}`]: priceFrom ? `${priceFrom}..` : undefined,
      [`statistics.price.to.${currency.toLowerCase()}`]: priceTo ? `..${priceTo}` : undefined,
    };
  }

  return {};
};

export const mapFilter = (filter = {}) => {
  const {
    name,
    [`location.street`]: street,
    [`stats.price.currency`]: priceCurrency,
    [`stats.price.from`]: priceFrom,
    [`stats.price.to`]: priceTo,
    ...restFilterFields,
  } = filter;

  return ({
    ...restFilterFields,
    name: name ? `*${name}*` : undefined,
    'location.street': street ? `*${street}*` : undefined,
    ...makeStatsPriceFilter(priceCurrency, priceFrom, priceTo),
  });
};
