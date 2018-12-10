import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString } = normalizers;

export default {
  result: normalizeString,

  'contactDetails.goal': normalizeString,
  'contactDetails.contactId': normalizeNumber,
  'contactDetails.propertyId': normalizeNumber,
  'contactDetails.dealId': normalizeNumber,
  'contactDetails.clientLeadId': normalizeNumber,

  'previewDetails.contactId': normalizeNumber,
  // 'previewDetails.propertyId': normalizeNumber,
  // 'previewDetails.propertyCategory': normalizeNumber,
  'previewDetails.dealId': normalizeNumber,
  'previewDetails.archivedDocumentId': normalizeNumber,

  'negotiationDetails.contactId': normalizeNumber,
  // 'negotiationDetails.propertyId': normalizeNumber,
  'negotiationDetails.dealId': normalizeNumber,
  'negotiationDetails.archivedDocumentId': normalizeNumber,

  'freeDetails.goal': normalizeString,
  'freeDetails.contactId': normalizeNumber,
  'freeDetails.propertyId': normalizeNumber,
  'freeDetails.dealId': normalizeNumber,
  'freeDetails.clientLeadId': normalizeNumber,
};
