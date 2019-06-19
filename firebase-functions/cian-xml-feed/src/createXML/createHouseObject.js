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

const getOppositeOfferKind = (offerKind) => {
  switch (offerKind) {
    case 'sale':
      return 'rent';
    case 'rent':
      return 'sale';
    default:
      return 'rent';
  }
}

exports.createHouseObject = item => {
  try{
    //we need to validate that we have an object for presented offerKind
    if (!item[`${item.offerKind}Offer`]){
      //we don't have an object for this offerKind
      //maybe we have it for opposite offerKind?
      if (item[`${getOppositeOfferKind(item.offerKind)}Offer`]){
        //yes, we have an object for opposite offerKind, so we will export this house to the feed with changed offerKind
        item.offerKind = getOppositeOfferKind(item.offerKind);
      } else {
        //it looks like we don't have any deal objects
        //let's skip this house
        return null;
      }
    }

    return ({
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
            { ClientFee: 50 },
            { AgentFee: 50 },
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
    })
  } catch(ex){
    //TODO: add some storage for houses that encountered processing error
    //in case of error we also return null
    return null;
  }
};
