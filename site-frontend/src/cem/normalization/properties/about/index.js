import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString } = normalizers;

export default {
  'rentOffer.price': normalizeNumber,
  // 'rentOffer.isAllowedPets': normalizeStringBool,
  // 'rentOffer.isAllowedChildren': normalizeBool,
  // 'rentOffer.isAgentFixed': normalizeBool,
  'rentOffer.agentFee': normalizeNumber,
  'rentOffer.agentFixedPrice.price': normalizeNumber,

  'saleOffer.price': normalizeNumber,
  // 'saleOffer.isResale': normalizeBool,
  // 'saleOffer.isBargain': normalizeBool,
  // 'saleOffer.isMortgage': normalizeBool,
  // 'saleOffer.isInstallment': normalizeBool,
  // 'saleOffer.isAgentFixed': normalizeBool,
  'saleOffer.agentFee': normalizeNumber,
  'saleOffer.agentFixedPrice.price': normalizeNumber,

  note: normalizeString,
};
