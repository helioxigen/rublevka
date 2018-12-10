import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString } = normalizers;

export default {
  externalId: normalizeString,
  'saleOffer.price': normalizeNumber,
  'specification.floor': normalizeNumber,
  'specification.rooms': normalizeNumber,
  'specification.totalArea': normalizeNumber,
  'specification.livingArea': normalizeNumber,
};
