import commonFields from './common';
import validate from 'cem/validators/leads/selling';

const saleFields = [
  'requestDetails.saleOffer.isAgentFixed',
  'requestDetails.saleOffer.price',
  'requestDetails.saleOffer.currency',
  'requestDetails.saleOffer.agentFee',
  'requestDetails.saleOffer.kind',
  'requestDetails.saleOffer.isBargain',
  'requestDetails.saleOffer.isMortgage',
  'requestDetails.saleOffer.isInstallment',
  'requestDetails.saleOffer.agentFixedPrice.price',
  'requestDetails.saleOffer.agentFixedPrice.currency',
];

const rentFields = [
  'requestDetails.rentOffer.isAgentFixed',
  'requestDetails.rentOffer.price',
  'requestDetails.rentOffer.currency',
  'requestDetails.rentOffer.agentFee',
  'requestDetails.rentOffer.agentFixedPrice.price',
  'requestDetails.rentOffer.agentFixedPrice.currency',
  'requestDetails.rentOffer.deposit',
  'requestDetails.rentOffer.period',
  'requestDetails.rentOffer.isAllowedPets',
  'requestDetails.rentOffer.isAllowedChildren',
];

const propertyFields = [
  ...saleFields,
  ...rentFields,
  'requestDetails.category',
  'requestDetails.kind',
  'requestDetails.requestKind',
];

const formFields = [...commonFields, ...propertyFields];

const formSettings = {
  form: 'leadSellingRequest',
  fields: formFields,
  validate,
  destroyOnUnmount: false,
};

export default formSettings;
