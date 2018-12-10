import normalizers from 'core/utils/normalizers';
const { normalizeString } = normalizers;

export default {
  'details.firstName': normalizeString,
  'details.middleName': normalizeString,
  'details.lastName': normalizeString,
  'details.email': normalizeString,
  // 'details.phoneNumber': normalizePhoneNumber,
  note: normalizeString,
  // 'additionalDetails.additionalPhoneNumber': normalizePhoneNumber,
  'additionalDetails.additionalEmail': normalizeString,
  'additionalDetails.autoNumber': normalizeString,
  'additionalDetails.autoRegion': normalizeString,
};
