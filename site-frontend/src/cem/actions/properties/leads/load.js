import { API } from 'core/config/sources';

import * as types from 'cem/constants/properties/actions';

import { updatePagination } from 'core/actions/pagination';

const loadLeadsStarted = propertyId => ({
  type: types.LOAD_LEADS,
  propertyId,
});

const loadLeadsSucceeded = (propertyId, { items, pagination }) => dispatch => {
  dispatch(updatePagination('leadsByPropertyId', pagination));

  return dispatch({
    type: types.LOAD_LEADS_SUCCESS,
    propertyId,
    items,
  });
};

const loadLeadsFailed = (propertyId, { errors }) => ({
  type: types.LOAD_LEADS_FAIL,
  propertyId,
  errors,
});

export default propertyId => dispatch => {
  dispatch(loadLeadsStarted(propertyId));

  const queryParams = {
    filter: { 'requestDetails.properties.propertyId': propertyId },
  };

  return API.get('/v1/client_leads', queryParams).then(
    ({ body }) => dispatch(loadLeadsSucceeded(propertyId, body)),
    ({ body }) => dispatch(loadLeadsFailed(propertyId, body)),
  );
};
