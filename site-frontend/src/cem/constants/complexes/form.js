import validate from 'cem/validators/complexes';

const imagesFields = [
  'images[].id',
  'images[].url',
  'images[].isPublic',
];

const locationFields = [
  'location.countryName',
  'location.countryId',
  'location.regionName',
  'location.regionId',
  'location.localityName',
  'location.localityId',
  'location.subLocalityName',
  'location.subLocalityId',

  'location.postalCode',
  'location.street',
  'location.house',

  'location.latitude',
  'location.longitude',

  'location.subwayIds',
];

const fields = [
  'id',
  'name',
  'state',
  'note',
  'commissioningQuarter',
  'commissioningYear',
  'keysIssueDate',
  'accreditors',

  'adjacentTerritory.area',
  'adjacentTerritory.playgrounds',
  'adjacentTerritory.isAccessOpen',
  'adjacentTerritory.isAllowedCars',
  'adjacentTerritory.isGreeneryPlanted',

  'purchaseTimeConditions.oralReservation',
  'purchaseTimeConditions.agreementPreparation',
  'purchaseTimeConditions.developerAgreement',
  'purchaseTimeConditions.stateRegistrationPreparation',
  'purchaseTimeConditions.signing',
  'purchaseTimeConditions.stateRegistration',
  'purchaseTimeConditions.documentDelivery',
  'purchaseTimeConditions.payment',

  ...imagesFields,
  ...locationFields,
  'responsibleUser.id',
  '_photosToggle',
];

export const formSettings = {
  form: 'complex',
  destroyOnUnmount: false,
  fields,
  validate,
};
