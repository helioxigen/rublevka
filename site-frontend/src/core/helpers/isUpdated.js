import isEqual from 'lodash/isEqual';

export default (resource, props = {}, nextProps = {}) => {
  if (!resource) throw Error('Resource is undefined');

  const pagination = props.pagination[resource] || {};
  const nextPagination = nextProps.pagination[resource] || {};
  const offset = pagination.offset || 0;
  const nextOffset = nextPagination.offset || 0;

  const filters = props.filters[resource] || {};
  const nextFilters = nextProps.filters[resource] || {};

  const order = props.order[resource] || {};
  const nextOrder = nextProps.order[resource] || {};

  const isPaginationUpdated = !isEqual(offset, nextOffset);
  const isFiltersUpdated = !isEqual(filters, nextFilters);
  const isOrderUpdated = !isEqual(order, nextOrder);

  return isPaginationUpdated || isFiltersUpdated || isOrderUpdated;
};
