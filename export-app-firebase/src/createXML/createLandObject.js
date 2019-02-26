const { routeToRouteId } = require('./dictionaries');
const { upperCaseFirst } = require('../helpers');
const {
  getLandDescription,
  getImageLink,
  getPublishServices,
} = require('./utils');

exports.createLandObject = item => ({
  object: [
    {
      Category: `land${upperCaseFirst(item.offerKind)}`,
    },
    { ExternalId: `${item.id}-${item.offerKind}` },
    { Description: getLandDescription(item) },
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
    {
      Land: [{ Area: item.landDetails.area }, { AreaUnitType: 'sotka' }],
    },
    { IsInHiddenBase: false },
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
