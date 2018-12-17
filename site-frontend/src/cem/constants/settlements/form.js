import { validateCommonFields, validatePropertiesTableFields } from 'cem/validators/settlements';
import { metaKeys } from 'cem/components/seo/meta';

const imagesFields = ['images[].id', 'images[].url', 'images[].isPublic'];

const locationFields = [
  'location.localityId',
  'location.linkedLocalityIds',
  'location.latitude',
  'location.longitude',
  'location.mkadDistance',
  'location.countryName',
  'location.districtName',
  'location.regionName',
  'location.routeName',
];

const detailsFields = [
  'details.foundationYear',
  'details.area',
  'details.powerSupply',
  'details.waterSupply',
  'details.gasSupply',
  'details.sewerageSupply',
  'details.externalInfrastructure',
  'details.internalInfrastructure',
  'details.landState',
];

export const fields = [
  'state',
  'name',
  'aliases',
  'slug',
  'kindId',
  'description.main.sale',
  'description.main.rent',
  'description.satellite.sale',
  'description.satellite.rent',
  'toggle',
  ...locationFields,
  ...detailsFields,
  ...imagesFields,
  ...metaKeys(),
];

export const propertiesTableFormSettings = {
  form: 'settlementPrimaryPropertiesTable',
  fields: [
    'id',
    'externalId',
    'location.house',
    'kind',
    'state',
    'saleOffer.price',
    'saleOffer.currency',
    'landDetails.area',
    'specification.area',
    'specification.condition',
    'specification.renovate',
    'specification.furniture',
  ],
  validate: validatePropertiesTableFields,
};

export const commonFieldsFormSettings = {
  form: 'settlementPrimaryPropertiesCommonFields',
  fields: [
    'saleOffer.kind',
    'saleOffer.isMortgage',
    'saleOffer.isInstallment',
    'saleOffer.isBargain',
    'saleOffer.isAgentFixed',
    'saleOffer.agentFee',
    'saleOffer.agentFixedPrice.price',
    'saleOffer.agentFixedPrice.currency',
  ],
  validate: validateCommonFields,
};

export default {
  form: 'settlements',
  fields,
  destroyOnUnmount: false,
};
