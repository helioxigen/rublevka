import normalizers from 'core/utils/normalizers';
const { normalizeNumber } = normalizers;

export default {
  'saleOffer.agentFee': normalizeNumber,
  'saleOffer.agentFixedPrice.price': normalizeNumber,
};
