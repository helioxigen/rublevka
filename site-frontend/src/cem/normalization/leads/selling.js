import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeStringBool } = normalizers;

export default {
  'propertyDetails.saleDeal.price': normalizeNumber,
  'propertyDetails.saleDeal.isBargain': normalizeStringBool,
  'propertyDetails.saleDeal.isMortgage': normalizeStringBool,
  'propertyDetails.saleDeal.isInstallment': normalizeStringBool,
  'propertyDetails.saleDeal.isResale': normalizeStringBool,
  'propertyDetails.saleDeal.agentFee': normalizeNumber,
  'propertyDetails.saleDeal.agentFixedPrice': normalizeNumber,
  'propertyDetails.rentDeal.price': normalizeNumber,
  'propertyDetails.rentDeal.isAllowedPets': normalizeStringBool,
  'propertyDetails.rentDeal.isAllowedChildren': normalizeStringBool,
  'propertyDetails.rentDeal.agentFee': normalizeNumber,
  'propertyDetails.rentDeal.agentFixedPrice': normalizeNumber,
};
