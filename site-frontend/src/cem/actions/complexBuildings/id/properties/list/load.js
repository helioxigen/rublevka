import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';

import * as types from 'cem/constants/complexBuildings/actions';

const loadPropertiesStarted = (saleType, id) => ({
  type: types.LOAD_PROPERTIES,
  saleType,
  id,
});

const loadPropertiesSucceeded = (saleType, id, { items, pagination }) => (dispatch) => {
  dispatch(updatePagination(`complexBuildingProperties.${saleType}`, pagination));
  return dispatch({
    type: types.LOAD_PROPERTIES_SUCCESS,
    saleType,
    id,
    items,
  });
};

const loadPropertiesFailed = (saleType, id, { errors }) => ({
  type: types.LOAD_PROPERTIES_FAIL,
  saleType,
  id,
  errors,
});

const loadProperties = (id, saleType = 'primary', queryParams = { filter: {} }) => (dispatch) => {
  dispatch(loadPropertiesStarted(saleType, id));

  return API.get('/v1/properties/city', {
    ...queryParams,
    filter: { ...queryParams.filter, complexBuildingId: id },
  }).then(
    ({ body }) => dispatch(loadPropertiesSucceeded(saleType, id, body)),
    ({ body }) => dispatch(loadPropertiesFailed(saleType, id, body)),
  );
};

export const loadPrimaryProperties = (id, queryParams = { filter: {} }) => (dispatch) => {
  const defaultFilter = {
    'saleOffer.isResale': 'false',
  };
  dispatch(
    loadProperties(id, 'primary', {
      ...queryParams,
      filter: { ...queryParams.filter, ...defaultFilter },
      orderBy: { id: 'desc' },
    }),
  );
};
