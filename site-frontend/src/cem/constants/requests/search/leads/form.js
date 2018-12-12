import sellingFormSettings from 'cem/constants/leads/form/selling';

export default {
  ...sellingFormSettings,
  form: 'searchOrderLinkedLeadCreation',
  fields: [
    ...sellingFormSettings.fields,
    'propertySearchOrderId',
  ],
};
