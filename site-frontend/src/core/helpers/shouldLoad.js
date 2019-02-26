import isEqual from 'lodash/isEqual';

export const isPaginationOrFiltersOrOrderByUpdated = (
  resource,
  props = {},
  nextProps = {},
) => {
  if (resource === undefined) throw Error('Resource is undefined');

  const { state = {}, location = {} } = props;
  const { state: nextState = {}, location: nextLocation = {} } = nextProps;

  const statePagination = state.pagination[resource] || {};
  const nextStatePagination = nextState.pagination[resource] || {};

  const queryPagination = location.query || {};
  const nextQueryPagination = nextLocation.query || {};

  const offset =
    (queryPagination.page - 1) * statePagination.limit ||
    statePagination.offset ||
    0;
  const nextOffset =
    (nextQueryPagination.page - 1) * nextStatePagination.limit ||
    nextStatePagination.offset ||
    0;

  const filters = state.filters[resource] || {};
  const nextFilters = nextState.filters[resource] || {};

  const order = state.order[resource] || {};
  const nextOrder = nextState.order[resource] || {};

  const isPaginationUpdated = !isEqual(offset, nextOffset);
  const isFiltersUpdated = !isEqual(filters, nextFilters);
  const isOrderUpdated = !isEqual(order, nextOrder);

  return isPaginationUpdated || isFiltersUpdated || isOrderUpdated;
};

export const isPkInParamsUpdated = (pk, props = {}, nextProps = {}) =>
  !isEqual(props.params[pk], nextProps.params[pk]);
