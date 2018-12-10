import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeDate } = normalizers;

export default {
  'details.budget': normalizeNumber,
  'details.expectedAgentFee': normalizeNumber,
  'details.expectedFinishDateAt': normalizeDate,
  'details.expectedAgentFixedPrice.price': normalizeNumber,
  'details.propertyId': normalizeNumber,
};
