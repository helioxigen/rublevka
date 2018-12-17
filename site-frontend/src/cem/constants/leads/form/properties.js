import commonFields from './common';
import validate from 'cem/validators/leads/properties';

const propertyRequestFields = ['propertyId', 'propertyKind'];

const fields = [
  ...commonFields,
  'requestDetails.requestKind',
  ...propertyRequestFields.map(field => `requestDetails.properties[].${field}`),
];

const formSettings = {
  form: 'leadPropertiesRequest',
  fields,
  validate,
  destroyOnUnmount: false,
};

export default formSettings;
