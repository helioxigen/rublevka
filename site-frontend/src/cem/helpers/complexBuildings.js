import { formHelpers, recursiveCleanUp } from 'cem/helpers';
const { normalizeNumber } = formHelpers;

const transformComplexDetails = details => ({
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
  infrastructureUnits: details.infrastructureUnits || [],
  withRubbishChute: details.withRubbishChute === 'true',
  withWasteDisposalRoom: details.withWasteDisposalRoom === 'true',
});

const transformLocation = (location) => {
  if (location) {
    return {
      ...location,
      subwayIds: location.subwayIds || [],
    };
  }
};

export const transformDataOut = (data) => {
  const values = recursiveCleanUp(data);

  return {
    ...values,
    name: values.name !== '' ? values.name : undefined,
    details: values.details ? transformComplexDetails(values.details) : undefined,
    location: transformLocation(values.location),
  };
};

export const transformDataIn = data => ({
  ...data,
  details: {
    ...data.details,
    withParkings: data.details.parkings ? 'true' : 'false',
    withUndergroundGarages: data.details.undergroundGarages ? 'true' : 'false',
    withRubbishChute: data.details.withRubbishChute ? 'true' : 'false',
    withWasteDisposalRoom: data.details.withWasteDisposalRoom ? 'true' : 'false',
  },
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
});
