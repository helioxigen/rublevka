import { formHelpers, recursiveCleanUp } from 'cem/helpers';
const { normalizeNumber, normalizeString } = formHelpers;

import { makeDateRange, formatFilterDate } from 'core/helpers';

const transformFixedPriceOut = fixedPrice => ({
  ...fixedPrice,
  price: normalizeNumber(fixedPrice.price),
});

const transformFixedPriceIn = fixedPrice => ({
  ...fixedPrice,
  price: normalizeString(fixedPrice.price),
});

const transformRentOfferOut = deal => ({
  ...deal,
  price: normalizeNumber(deal.price),
  isAllowedPets: deal.isAllowedPets === 'true',
  isAllowedChildren: deal.isAllowedChildren === 'true',
  agentFee:
    deal.isAgentFixed !== 'true' ? normalizeNumber(deal.agentFee) : undefined,
  agentFixedPrice:
    deal.isAgentFixed === 'true'
      ? transformFixedPriceOut(deal.agentFixedPrice)
      : undefined,
});

const transformRentOfferIn = deal => ({
  ...deal,
  price: normalizeString(deal.price),
  isAllowedPets: String(deal.isAllowedPets),
  isAllowedChildren: String(deal.isAllowedChildren),
  isAgentFixed: String(!!deal.agentFixedPrice),
  agentFee: !deal.agentFixedPrice ? normalizeString(deal.agentFee) : undefined,
  agentFixedPrice: deal.agentFixedPrice
    ? transformFixedPriceIn(deal.agentFixedPrice)
    : undefined,
});

const transformSaleOfferOut = deal => ({
  ...deal,
  price: normalizeNumber(deal.price),
  isBargain: deal.isBargain === 'true',
  isMortgage: deal.isMortgage === 'true',
  isInstallment: deal.isInstallment === 'true',
  isResale: true,
  agentFee:
    deal.isAgentFixed !== 'true' ? normalizeNumber(deal.agentFee) : undefined,
  agentFixedPrice:
    deal.isAgentFixed === 'true'
      ? transformFixedPriceOut(deal.agentFixedPrice)
      : undefined,
});

const transformSaleOfferIn = deal => ({
  ...deal,
  price: normalizeNumber(deal.price),
  isBargain: String(deal.isBargain),
  isMortgage: String(deal.isMortgage),
  isInstallment: String(deal.isInstallment),
  isResale: String(deal.isResale),
  isAgentFixed: String(!!deal.agentFixedPrice),
  agentFee: !deal.agentFixedPrice ? normalizeString(deal.agentFee) : undefined,
  agentFixedPrice: deal.agentFixedPrice
    ? transformFixedPriceIn(deal.agentFixedPrice)
    : undefined,
});

const transformLeadOut = lead => {
  const values = recursiveCleanUp(lead);
  const { requestDetails = {} } = values;

  return {
    ...values,
    requestDetails: {
      ...values.requestDetails,
      saleOffer: requestDetails.saleOffer
        ? transformSaleOfferOut(requestDetails.saleOffer)
        : undefined,
      rentOffer: requestDetails.rentOffer
        ? transformRentOfferOut(requestDetails.rentOffer)
        : undefined,
    },
  };
};

const transformLeadIn = lead => {
  const values = recursiveCleanUp(lead);
  const { requestDetails = {} } = values;

  return {
    ...values,
    requestDetails: {
      ...values.requestDetails,
      saleOffer: requestDetails.saleOffer
        ? transformSaleOfferIn(requestDetails.saleOffer)
        : undefined,
      rentOffer: requestDetails.rentOffer
        ? transformRentOfferIn(requestDetails.rentOffer)
        : undefined,
    },
  };
};

const transformLead = lead => ({
  ...lead,
  phoneCallDetails:
    lead.kind === 'phone_call' ? lead.phoneCallDetails : undefined,
  requestDetails: {
    ...lead.requestDetails,
    countryProperty:
      ['selection', 'purchase'].indexOf(lead.requestDetails.requestKind) > -1 &&
      lead.requestDetails.category === 'country'
        ? lead.requestDetails.countryProperty
        : undefined,
    cityProperty:
      ['selection', 'purchase'].indexOf(lead.requestDetails.requestKind) > -1 &&
      lead.requestDetails.category === 'city'
        ? lead.requestDetails.cityProperty
        : undefined,
  },
});

const mapFilterAndFilterNot = (
  {
    createdAtFrom,
    createdAtTo,
    awaitingApproval,
    notAwaitingApproval,
    ...filter
  } = {},
  filterNot = {},
) => {
  const tasksWeightZeroDeadline = filter['tasksWeight.zero.deadline'];
  const phoneNumber = filter['contactDetails.phoneNumber'];

  return {
    filter: {
      ...filter,
      createdAt: makeDateRange(
        createdAtFrom && formatFilterDate(createdAtFrom),
        createdAtTo && formatFilterDate(createdAtTo),
      ),
      'tasksWeight.zero.deadline': tasksWeightZeroDeadline
        ? formatFilterDate(tasksWeightZeroDeadline)
        : undefined,
      ...(phoneNumber
        ? { 'contactDetails.phoneNumber': `*${phoneNumber}*` }
        : {}),
      ...(awaitingApproval
        ? { 'stateDetails.toApprove': 'spam,processed,rejected' }
        : {}),
    },
    filterNot: {
      ...filterNot,
      ...(notAwaitingApproval
        ? { 'stateDetails.toApprove': 'spam,processed,rejected' }
        : {}),
    },
  };
};

export {
  transformLead,
  transformLeadIn,
  transformLeadOut,
  mapFilterAndFilterNot,
};
