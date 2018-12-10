import normalizers from 'core/utils/normalizers';
const { normalizeNumber, normalizeString, normalizeYear } = normalizers;

const normalizeConditionalNumber = (value, previousValue) => {
  if (value === undefined) return value;

  return normalizeNumber(value, previousValue);
};

export default {
  name: normalizeString,
  note: normalizeString,
  commissioningQuarter: normalizeNumber,
  commissioningYear: normalizeYear({ isLimitedToPast: false }),

  'adjacentTerritory.area': normalizeNumber,
  'adjacentTerritory.playgrounds': normalizeNumber,

  'purchaseTimeConditions.oralReservation': normalizeConditionalNumber,
  'purchaseTimeConditions.agreementPreparation': normalizeConditionalNumber,
  'purchaseTimeConditions.developerAgreement': normalizeNumber,
  'purchaseTimeConditions.stateRegistrationPreparation': normalizeNumber,
  'purchaseTimeConditions.signing': normalizeNumber,
  'purchaseTimeConditions.stateRegistration': normalizeNumber,
  'purchaseTimeConditions.documentDelivery': normalizeNumber,
  'purchaseTimeConditions.payment': normalizeNumber,

  'location.postalCode': normalizeNumber,
};
