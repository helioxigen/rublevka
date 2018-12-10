import normalizers from 'core/utils/normalizers';
const { normalizePhone, normalizeName } = normalizers;

export default {
  'contactDetails.phoneNumber': normalizePhone,
  'contactDetails.firstName': normalizeName,
  'contactDetails.lastName': normalizeName,
};
