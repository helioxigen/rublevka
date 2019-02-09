const { routeToRouteId } = require('./dictionaries');
const { upperCaseFirst } = require('../helpers');
const {
  getHouseDescription,
  getImageLink,
  getPublishServices,
} = require('./utils');

const getCategory = (category) => {
  switch (category) {
    case 'townhouse':
      return 'townhouse';
    case 'house':
      return 'house';
    default:
      return 'house';
  }
};

exports.createHouseObject = item => ({
  object: [
    {
      Category: `${getCategory(item.kind)}${upperCaseFirst(item.offerKind)}`,
    },
    { ExternalId: `${item.id}-${item.offerKind}` },
    { Description: getHouseDescription(item) },
    {
      Phones: [
        {
          PhoneSchema: [{ CountryCode: '+7' }, { Number: '4954323444' }],
        },
      ],
    },
    {
      PublishTerms: [
        {
          Terms: [
            {
              PublishTermSchema: [
                {
                  Services: getPublishServices(item),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      Address: [
        item.location.regionName,
        `${item.location.districtName} район`,
        item.location.localityName,
        item.location.settlementName,
      ].join(', '),
    },
    {
      Highway: [
        { Id: routeToRouteId[item.location.routeName] },
        { Distance: item.location.mkadDistance },
      ],
    },
    {
      Coordinates: [
        { Lat: item.location.latitude },
        { Lng: item.location.longitude },
      ],
    },
    { TotalArea: item.specification.area },
    { BedroomsCount: item.specification.bedrooms },
    { HasElectricity: !!item.communication.powerSupply },
    { HasWater: !!item.communication.waterSupply },
    { HasGas: item.communication.gasSupply !== 'without_gas' },
    { HasDrainage: !!item.communication.sewerageSupply },
    { HasGarage: !!item.additionalDetails.garageArea },
    { HasSecurity: true },
    { IsInHiddenBase: false },
    {
      RepairType: item.specification.renovate === 'design' ? 'design' : 'no',
    },
    {
      Building: [
        { FloorsCount: item.specification.floors },
        { BuildYear: item.specification.builtYear },
        { MaterialType: item.specification.wallMaterial },
        { HeatingType: item.communication.gasSupply && 'centralGas' },
      ],
    },
    { WcLocationType: 'indoors' },
    {
      Land: [{ Area: item.landDetails.area }, { AreaUnitType: 'sotka' }],
    },
    {
      BargainTerms: [
        { Price: item[`${item.offerKind}Offer`].price },
        { Currency: item[`${item.offerKind}Offer`].currency.toLowerCase() },
        {
          AgentBonus: [{ Value: 50 }, { PaymentType: 'percent' }],
        },
      ],
    },
    {
      Photos: item.images.map((img, index) => ({
        PhotoSchema: [
          { FullUrl: getImageLink(img.id) },
          { IsDefault: index === 0 },
        ],
      })),
    },
  ],
});
