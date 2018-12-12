import normalizers from 'core/utils/normalizers';
const { normalizeNumber } = normalizers;

export default {
  budget: normalizeNumber,
  expectedAgentFee: normalizeNumber,
  'expectedAgentFixedPrice.price': normalizeNumber,
};
