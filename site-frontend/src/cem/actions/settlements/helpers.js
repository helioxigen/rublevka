import { recursiveCleanUp } from 'cem/helpers';
import helpers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString, normalizeArray, numberArray } = helpers;

import { makeFilterRange } from 'core/helpers';

const transformSettlementDetailsOut = details => ({
  ...details,
  foundationYear: normalizeNumber(details.foundationYear),
  area: normalizeNumber(details.area),
  powerSupply: normalizeNumber(details.powerSupply),
  externalInfrastructure: details.externalInfrastructure || [],
  internalInfrastructure: details.internalInfrastructure || [],
  landState: details.landState || [],
});

const transformSettlementDetailsIn = details => ({
  ...details,
  foundationYear: normalizeString(details.foundationYear),
  area: normalizeString(details.area),
  powerSupply: normalizeString(details.powerSupply),
});

const transformLocationOut = location => ({
  ...location,
  mkadDistance: normalizeNumber(location.mkadDistance),
  linkedLocalityIds: numberArray(location.linkedLocalityIds),
});

const transformLocationIn = location => ({
  ...location,
  mkadDistance: normalizeString(location.mkadDistance),
});

export const transformSettlementOut = (settlement) => {
  const values = recursiveCleanUp(settlement);

  return {
    ...values,
    location: values.location ? transformLocationOut(values.location) : { linkedLocalityIds: [] },
    aliases: normalizeArray(values.aliases),
    details: values.details ? transformSettlementDetailsOut(values.details) : {
      externalInfrastructure: [],
      internalInfrastructure: [],
    },
  };
};

export const transformSettlementIn = (data) => {
  const values = recursiveCleanUp(data);

  return {
    ...values,
    location: values.location ? transformLocationIn(values.location) : undefined,
    details: values.details ? transformSettlementDetailsIn(values.details) : undefined,
    ...(data.propertyDefaults ? {
      propertyDefaults: {
        ...data.propertyDefaults,
        ...(data.propertyDefaults.saleOffer ? {
          saleOffer: {
            ...data.propertyDefaults.saleOffer,
            isAgentFixed: String(!!data.propertyDefaults.saleOffer.agentFixedPrice && !!Object.keys(data.propertyDefaults.saleOffer.agentFixedPrice).length),
            agentFee: normalizeNumber(data.propertyDefaults.saleOffer.agentFee),
            isBargain: data.propertyDefaults.saleOffer.isBargain ? 'true' : 'false',
            isInstallment: data.propertyDefaults.saleOffer.isInstallment ? 'true' : 'false',
            isMortgage: data.propertyDefaults.saleOffer.isMortgage ? 'true' : 'false',
          },
        } : {}),
      },
    } : {}),
  };
};

export const mapFilter = (filter) => {
  const { name, mkadFrom, mkadTo, ...params } = filter;

  return {
    ...params,
    name: name ? `*${name}*` : undefined,
    'location.mkadDistance': makeFilterRange(mkadFrom, mkadTo),
  };
};
