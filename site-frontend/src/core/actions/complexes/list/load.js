import { API } from 'core/config/sources';

import * as types from 'core/constants/complexes';

import { loadComplexBuildings } from '../buildings/buildings';
import { updatePagination } from 'site/actions/pagination';

import { makeRoomsFilterAndFilterNot } from 'core/utils/properties';

// TODO Extract into helpers
const toMillion = value => value * 1000000;

// TODO Extract as 'makeRangeFilter' helper function
const makePriceFilter = (currency, from, to) => {
  if (from === undefined && to === undefined) {
    return {};
  } else if (to === 'max') {
    return { [`statistics.price.from.${currency}`]: `${toMillion(from)}..` };
  }
  return {
    [`statistics.price.from.${currency}`]: `${toMillion(from)}..`,
    [`statistics.price.to.${currency}`]: `..${toMillion(to)}`,
  };
};

const makeTotalAreaFilter = (from, to) => {
  if (from === undefined && to === undefined) {
    return {};
  } else if (to === 'max') {
    return { 'properties.specification.totalArea': `${from}..` };
  }
  return { 'properties.specification.totalArea': `${from}..${to}` };
};

const mapFilter = ({ filter = {} }) => {
  const {
    'stats.price.from': priceFrom,
    'stats.price.to': priceTo,
    'stats.totalArea.from': totalAreaFrom,
    'stats.totalArea.to': totalAreaTo,
    ...restFilter
  } = filter;

  return {
    filter: {
      ...restFilter,
      state: 'public',
      ...makeTotalAreaFilter(totalAreaFrom, totalAreaTo),
      ...makePriceFilter('usd', priceFrom, priceTo),
      ...makeRoomsFilterAndFilterNot(filter, 'properties.specification.rooms')
        .filter,
    },
    filterNot: {
      ...makeRoomsFilterAndFilterNot(filter, 'properties.specification.rooms')
        .filterNot,
    },
  };
};

const mapPagination = ({ pagination = {} }) => ({
  pagination: {
    ...pagination,
    limit: 5,
    offset: pagination.offset,
  },
});

const loadComplexesStarted = () => ({
  type: types.LOAD_COMPLEXES,
});

const loadComplexesSucceeded = ({ items, pagination }) => dispatch => {
  const complexesIds = items.map(item => item.id);

  if (complexesIds.length)
    dispatch(loadComplexBuildings({ filter: { complexId: complexesIds } }));

  dispatch(updatePagination(pagination, 'complexes', ''));

  return dispatch({
    type: types.LOAD_COMPLEXES_SUCCESS,
    items,
  });
};

const loadComplexesFailed = ({ errors }) => ({
  type: types.LOAD_COMPLEXES_FAIL,
  errors,
});

const loadComplexes = (queryParams = {}) => dispatch => {
  const query = {
    ...queryParams,
    ...mapFilter(queryParams),
    ...mapPagination(queryParams),
  };

  dispatch(loadComplexesStarted());

  return API.get('/v1/complexes', query).then(
    ({ body }) => dispatch(loadComplexesSucceeded(body)),
    ({ body }) => dispatch(loadComplexesFailed(body)),
  );
};

export default loadComplexes;
