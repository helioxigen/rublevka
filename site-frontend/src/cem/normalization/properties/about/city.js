import normalizers from 'core/utils/normalizers';
const { normalizeNumber } = normalizers;

export default {
  'location.entrance': normalizeNumber,
  'specification.kitchenArea': normalizeNumber,
};
