import commonFields from './common';
import validate from 'cem/validators/leads/selection';

const requestCityLocationFields = [
  'subLocalityId',
  'complexBuildingId',
  'street',
];

const requestCityFields = [
  'area.from',
  'area.to',
  'livingArea.from',
  'livingArea.to',
  'rooms.from',
  'rooms.to',
  ...requestCityLocationFields.map(field => `location.${field}`),
];

const requestCountryLocationFields = [
  'routeId',
  'localityId',
  'settlementId',
  'mkadDistance.from',
  'mkadDistance.to',
];

const requestCountryFields = [
  'area.from',
  'area.to',
  'bedrooms.from',
  'bedrooms.to',
  'landArea.from',
  'landArea.to',
  ...requestCountryLocationFields.map(field => `location.${field}`),
];

const requestFields = [
  'offerKind',
  'category',
  'kind',
  'renovate',
  'condition',
  'furniture',
  'requestKind',
  'price.from',
  'price.to',
  'currency',
  ...requestCityFields.map(field => `cityProperty.${field}`),
  ...requestCountryFields.map(field => `countryProperty.${field}`),
];

const fields = [
  ...commonFields,
  ...requestFields.map(field => `requestDetails.${field}`),
];

const formSettings = {
  form: 'leadSelectionRequest',
  fields,
  validate,
  destroyOnUnmount: false,
};

export default formSettings;
