import { validate } from 'cem/validators/settings/exportPackages';

const fields = [
  'id',
  'state',
  'title',
  'format',
  'companyName',
  'companyEmail',
  'companyPhoneNumber',

  'filter.id',
  'filter.category',
  'filter.state',
  'filter.kind',
  'filter.location.settlementId',
  'filter.saleOffer.price',
  'filter.rentOffer.price',
  'filter.isResale',

  'filterNot.id',
  'filterNot.location.settlementId',

  'feedId',
  'statistics.propertiesCount',

  'updatedAt',
  'createdAt',
  'lastExportAt',

  'cianDetails.top',
  'cianDetails.premium',
  'cianDetails.highlight',
  'watermark',
];

export const formSettings = {
  form: 'package',
  fields,
  destroyOnUnmount: false,
  validate,
};
