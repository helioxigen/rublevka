// import { makeFilterRange } from 'site/helpers';
//
// const saleMultiplier = 1000000;
// const rentMultiplier = 1000;

export const mapParams = ({
  pagination = {},
  orderBy = {},
  filter = {},
  filterNot = {},
}) => {
  const { limit, offset } = pagination;
  // const { sale = {}, rent = {}, area = {}, landArea = {}, mkadDistance = {}, settlements = [] } = filter;

  return {
    pagination: {
      limit,
      offset,
    },
    orderBy: {
      [orderBy.field]: orderBy.predicate,
    },
    filter: {
      ...filter,
    },
    filterNot,
  };
};
