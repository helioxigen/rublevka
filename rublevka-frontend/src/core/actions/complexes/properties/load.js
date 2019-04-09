import { API } from 'core/config/sources';

import * as types from 'core/constants/complexes';

import { makeRoomsFilterAndFilterNot } from 'core/utils/properties';
import { updatePagination } from 'actions/pagination';

const mapOrderBy = (orderBy = {}) => ({
  [orderBy.field]: orderBy.predicate,
});

const loadPropertiesStarted = (saleType, id, append) => ({
  type: types.LOAD_PROPERTIES,
  saleType,
  id,
  append,
});

const loadPropertiesSucceeded = (
  saleType,
  id,
  { items, pagination },
  append,
) => dispatch => {
  dispatch(updatePagination(pagination, 'complexBuilding.properties', ''));

  return dispatch({
    type: types.LOAD_PROPERTIES_SUCCESS,
    saleType,
    id,
    items,
    append,
  });
};

const loadPropertiesFailed = (saleType, id, { errors }) => ({
  type: types.LOAD_PROPERTIES_FAIL,
  saleType,
  id,
  errors,
});

const loadProperties = (
  id,
  saleType = 'primary',
  queryParams = { filter: {}, orderBy: {}, pagination: {} },
  append = false,
) => dispatch => {
  dispatch(loadPropertiesStarted(saleType, id, append));

  return API.get('/v1/properties/city', {
    ...queryParams,
    filter: { ...queryParams.filter, complexId: id },
  }).then(
    ({ body }) => dispatch(loadPropertiesSucceeded(saleType, id, body, append)),
    ({ body }) => dispatch(loadPropertiesFailed(saleType, id, body)),
  );
};

const loadPrimaryProperties = (
  id,
  queryParams = { filter: {} },
  append = false,
) => dispatch => {
  const defaultFilter = {
    'saleOffer.isResale': 'false',
    state: 'public',
  };

  const params = {
    ...queryParams,

    filter: {
      ...queryParams.filter,
      ...makeRoomsFilterAndFilterNot(queryParams.filter).filter,
      ...defaultFilter,
    },
    filterNot: {
      ...makeRoomsFilterAndFilterNot(queryParams.filter).filterNot,
    },
    orderBy: mapOrderBy(queryParams.orderBy),
    pagination: queryParams.pagination,
  };

  dispatch(loadProperties(id, 'primary', params, append));
};

export default loadPrimaryProperties;
