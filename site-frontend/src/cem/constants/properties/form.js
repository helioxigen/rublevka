import { detailsFields } from 'cem/constants/complexBuildings/form';

const saleFields = [
  'saleOffer.isAgentFixed',
  'saleOffer.isDisabled',
  'saleOffer.price',
  'saleOffer.currency',
  'saleOffer.agentFee',
  'saleOffer.kind',
  'saleOffer.isResale',
  'saleOffer.isBargain',
  'saleOffer.isMortgage',
  'saleOffer.isInstallment',
  'saleOffer.agentFixedPrice.price',
  'saleOffer.agentFixedPrice.currency',
];

const rentFields = [
  'rentOffer.isAgentFixed',
  'rentOffer.isDisabled',
  'rentOffer.price',
  'rentOffer.currency',
  'rentOffer.agentFee',
  'rentOffer.agentFixedPrice.price',
  'rentOffer.agentFixedPrice.currency',
  'rentOffer.deposit',
  'rentOffer.period',
  'rentOffer.isAllowedPets',
  'rentOffer.isAllowedChildren',
];

const specificationFields = {
  city: [
    'specification.layout',
    'specification.ceilHeight',
    'specification.totalArea',
    'specification.livingArea',
    'specification.rooms',
    'specification.wcs',
    'specification.loggias',
    'specification.balconies',
    'specification.floor',
    'specification.windows',
    'specification.bedrooms',
    'specification.panoramicGlazing',
    'specification.kitchenArea',
  ],
  country: [
    'specification.bedrooms',
    'specification.area',
    'specification.wallMaterial',
    'specification.roofMaterial',
    'specification.builtYear',
    'specification.floors',
    'specification.rooms',
    'specification.wcs',
    'specification.loggias',
    'specification.balconies',
    'specification.elevators',
    'specification.ceilingHeight',
    'specification.withConditioning',
    'specification.withVentilation',
    'specification.renovate',
    'specification.condition',
    'specification.furniture',
    'specification.legacyLayouts',
    'specification.layouts.wine_room',
    'specification.layouts.dressing_room',
    'specification.layouts.living_room',
    'specification.layouts.childrens_room',
    'specification.layouts.movie_theater',
    'specification.layouts.winter_garden',
    'specification.layouts.game_room',
    'specification.layouts.office',
    'specification.layouts.storage',
    'specification.layouts.kitchen',
    'specification.layouts.staff_room',
    'specification.layouts.working_kitchen',
    'specification.layouts.spa_zone',
    'specification.layouts.dining_room',
    'specification.layouts.technical_room',
    'specification.layouts.gym',
    'specification.layouts.utility_room',
    'specification.layouts.loft',
    'specification.spaces[].name',
    'specification.spaces[].kind',
    'specification.spaces[].area',
  ],
};

const informationFields = [
  'information.renovate',
  'information.conditioning',
  'information.condition',
  'information.furniture',
  'information.ventilation',
];

const imagesFields = ['images[].id', 'images[].url', 'images[].isPublic'];

const layoutFields = [
  'layoutImages[].id',
  'layoutImages[].url',
  'layoutImages[].isPublic',
];

const locationFields = {
  city: [
    'location.countryId',
    'location.countryName',
    'location.regionId',
    'location.regionName',
    'location.localityId',
    'location.localityName',
    'location.subLocalityId',
    'location.subLocalityName',
    'location.latitude',
    'location.longitude',
    'location.cadastralNumber',
    'location.entrance',
    'location.subwayIds',
  ],
  country: [
    'location.settlementId',
    'location.settlementName',
    'location.localityName',
    'location.districtName',
    'location.routeName',
    'location.mkadDistance',
    'location.latitude',
    'location.longitude',
    'location.cadastralNumber',
  ],
};

const addressMappingFields = {
  region: 'region',
  locality: 'city',
  subLocality: 'city_district',
  street: 'street',
  house: 'house',
  flatNumber: 'flat',
  postalCode: 'postal_code',
  kladrId: 'kladr_id',
};

const landDetailsFields = [
  'landDetails.landscaping',
  'landDetails.landscapeKind',
  'landDetails.area',
];

const additionalDetailsFields = [
  'additionalDetails.securityHouseArea',
  'additionalDetails.spaComplex',
  'additionalDetails.spaArea',
  'additionalDetails.guestHouseArea',
  'additionalDetails.staffHouseArea',
  'additionalDetails.parkingArea',
  'additionalDetails.garageArea',
  'additionalDetails.bathhouseArea',
];

const communicationFields = [
  'communication.powerSupply',
  'communication.waterSupply',
  'communication.gasSupply',
  'communication.sewerageSupply',
];

const commonFields = [
  'category',
  'kind',
  'state',
  'badge.id',
  'badge.title',
  'badge.color',
  'equipment',
  'isResidentialComplex',
  'toggle',
  'note',
  ...saleFields,
  ...rentFields,
  ...informationFields,
  ...imagesFields,
  ...layoutFields,
  ...Object.keys(addressMappingFields).map(field => `location.${field}`),
];

export const fields = {
  city: [
    ...commonFields,

    'complexBuildingId',

    ...detailsFields.map(field => `complexBuildingDetails.${field}`),
    ...specificationFields.city,
    ...locationFields.city,
    'information.bathroom',
  ],
  country: [
    ...commonFields,

    ...landDetailsFields,
    ...additionalDetailsFields,
    ...communicationFields,
    ...specificationFields.country,
    ...locationFields.country,
  ],
};

export const contactFields = ['linkedContactId', 'phoneNumber', 'kindId'];
