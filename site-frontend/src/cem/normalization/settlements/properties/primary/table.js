import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString } = normalizers;

export default {
  'saleOffer.price': normalizeNumber,
  'specification.area': normalizeNumber,
  'landDetails.area': normalizeNumber,
  'location.house': normalizeString,
};
