import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString } = normalizers;

export default {
  'location.building': normalizeString,
  'location.postalCode': normalizeNumber,
};
