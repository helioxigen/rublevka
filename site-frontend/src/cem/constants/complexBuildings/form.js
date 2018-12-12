import validate, { validateCommonFields, validatePropertiesTableFields } from 'cem/validators/complexBuildings';

export const detailsFields = [
  'series',
  'stage',
  'houseKind',
  'security',
  'constructionKind',
  'floors',
  'builtYear',
  'deliveryQuarter',
  'constructionStage',
  'elevators',
  'freightElevators',
  'withParkings',
  'parkings',
  'withUndergroundGarages',
  'undergroundGarages',
  'contractType',
  'architect',
  'developerId',
  'contractorId',
  'withRubbishChute',
  'infrastructureUnits',
  'withWasteDisposalRoom',
  'maintenanceCosts',
];

export const locationFields = [
  'location.countryId',
  'location.regionId',
  'location.districtId',
  'location.localityId',
  'location.subLocalityId',
  'location.latitude',
  'location.longitude',
  'location.street',
  'location.house',
  'location.housing',
  'location.building',
  'location.postalCode',
  'location.kladrId',
  'location.countryName',
  'location.regionName',
  'location.districtName',
  'location.localityName',
  'location.subLocalityName',
  'location.subwayIds',
];

const imagesFields = [
  'images[].id',
  'images[].url',
  'images[].isPublic',
];

const fields = [
  'id',
  'complexId',
  'name',
  'state',
  '_photosToggle',
  ...locationFields,
  ...(detailsFields.map(field => `details.${field}`)),
  ...imagesFields,
];

export const formSettings = {
  form: 'complexBuilding',
  destroyOnUnmount: false,
  fields,
  validate,
};

export const commonFieldsFormSettings = {
  form: 'complexBuildingPrimaryPropertiesCommonFields',
  fields: [
    'saleOffer.kind',
    'saleOffer.isMortgage',
    'saleOffer.isBargain',
    'saleOffer.isInstallment',
    'saleOffer.isAgentFixed',
    'saleOffer.agentFixedPrice.price',
    'saleOffer.agentFixedPrice.currency',
    'saleOffer.agentFee',
    'information.condition',
    'information.renovate',
    'information.furniture',
    'information.conditioning',
    'information.ventilation',
  ],
  validate: validateCommonFields,
};

export const propertiesTableFormSettings = {
  form: 'complexBuildingPrimaryPropertiesTable',
  fields: [
    ...commonFieldsFormSettings.fields,
    'id',
    'externalId',
    'kind',
    'state',
    'kind',
    'saleOffer.price',
    'saleOffer.currency',
    'specification.floor',
    'specification.rooms',
    'specification.totalArea',
    'specification.livingArea',
  ],
  validate: validatePropertiesTableFields,
};
