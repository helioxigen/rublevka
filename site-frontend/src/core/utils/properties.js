import { objectToRange } from './common';

import { maxRooms } from 'core/config/constants';

export const makeFilter = ({
  price = {},
  currency = 'usd',
  priceDelta,
  ...filter
} = {}) => ({
  ...filter,
  'location.mkadDistance': objectToRange(filter['location.mkadDistance']),
  'landDetails.area': objectToRange(filter['landDetails.area']),
  'specification.area': objectToRange(filter['specification.area']),
  'specification.totalArea': objectToRange(filter['specification.totalArea']),
  'specification.floor': objectToRange(filter['specification.floor']),
  'statistics.price': objectToRange(filter['statistics.price']),
  // 'location.settlementId': filter[`location.settlementId`] ? (filter[`location.settlementId`] || []).map(item => item.id) : null,
  [`${price.dealType}Offer.multiCurrencyPrice.${currency}`]: objectToRange(
    price,
  ),
  [`${priceDelta}Offer.priceDelta`]: priceDelta ? '..0,0..' : undefined,
});

export const makeFilterNot = filterNot => filterNot;

export const makeRoomsFilterAndFilterNot = (
  filter = {},
  filterName = 'specification.rooms',
) => {
  // TODO Get rid of this check by resetting persistent data in local storage as model changes
  const selectedRooms =
    (typeof filter[filterName] === 'number'
      ? [filter[filterName]]
      : filter[filterName]) || [];

  const allRoomsButMax = [1, 2, 3];
  const isMaxRoomsSelected = selectedRooms.indexOf(maxRooms) > -1;

  return {
    filter: isMaxRoomsSelected
      ? { [filterName]: undefined }
      : { [filterName]: selectedRooms.join(',') },
    filterNot: isMaxRoomsSelected
      ? {
          [filterName]: allRoomsButMax
            .filter(number => selectedRooms.indexOf(number) === -1)
            .join(','),
        }
      : { [filterName]: undefined },
  };
};
