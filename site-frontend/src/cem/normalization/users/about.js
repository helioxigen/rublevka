import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString } = normalizers;

export default {
  'details.experienceYears': normalizeNumber,
  'details.education': normalizeString,
  'details.description': normalizeString,
};
