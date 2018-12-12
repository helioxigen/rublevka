import { makeFilterRange } from 'site/helpers';

const saleMultiplier = 1000000;
const rentMultiplier = 1000;

export const mapParams = ({ pagination = {}, orderBy = {}, filter = {}, filterNot = {} }) => {
  const { limit, offset } = pagination;
  const { sale = {}, rent = {}, area = {}, landArea = {}, mkadDistance = {}, settlements = [] } = filter;

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy: {
      [orderBy.field]: orderBy.predicate,
    },
    filter: {
      state: filter.state,
      kind: filter.kind,
      'location.routeId': filter.routes,
      'saleOffer.multiCurrencyPrice.usd': makeFilterRange(sale.min, sale.max, saleMultiplier),
      'rentOffer.multiCurrencyPrice.usd': makeFilterRange(rent.min, rent.max, rentMultiplier),
      'specification.area': makeFilterRange(area.min, area.max),
      'landDetails.area': makeFilterRange(landArea.min, landArea.max),
      'specification.renovate': filter.renovate,
      'location.mkadDistance': makeFilterRange(mkadDistance.min, mkadDistance.max),
      'location.settlementId': settlements.map(settlement => settlement.id), // get only ids from settlements[{ id, name }]
    },
    filterNot,
  };
};
