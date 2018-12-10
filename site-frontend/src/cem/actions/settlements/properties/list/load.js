import { API } from 'core/config/sources';
import * as types from 'cem/constants/settlements/actions';

import { updatePagination } from 'core/actions/pagination';

const loadPropertiesStarted = (saleType, id) => ({
  type: types.LOAD_PROPERTIES,
  saleType,
  id,
});

const loadPropertiesSucceeded = (saleType, id, { items, pagination }) => (dispatch) => {
  dispatch(updatePagination(`settlementProperties.${saleType}`, pagination));
  return dispatch(({
    type: types.LOAD_PROPERTIES_SUCCESS,
    saleType,
    id,
    items,
  }));
};

const loadPropertiesFailed = (saleType, id, { errors }) => ({
  type: types.LOAD_PROPERTIES_FAIL,
  saleType,
  id,
  errors,
});

const loadProperties = (id, saleType = 'primary', queryParams = { filter: {} }) => (dispatch) => {
  dispatch(loadPropertiesStarted(saleType, id));
  const filter = {
    ...queryParams.filter,
    'location.settlementId': id,
    'saleOffer.isResale': 'false',
  };

  return API.get('/v1/properties/country', { ...queryParams, filter }).then(
    ({ body }) => dispatch(loadPropertiesSucceeded(saleType, id, body)),
    ({ body }) => dispatch(loadPropertiesFailed(saleType, id, body)),
  );
};

export const loadPrimaryProperties = (id, queryParams = { filter: {} }) => (dispatch) => {
  const primaryPropertiesFilter = {
    saleOffer: {
      isResale: false,
    },
  };
  dispatch(loadProperties(id, 'primary', { ...queryParams, filter: { ...queryParams.filter, ...primaryPropertiesFilter } }));
};
