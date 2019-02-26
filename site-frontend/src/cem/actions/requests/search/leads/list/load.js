import { API } from 'core/config/sources';

import * as types from 'cem/constants/requests/search/actions';

const loadLeadsStarted = searchRequestId => ({
  type: types.LOAD_LEADS,
  searchRequestId,
});

const loadLeadsSucceeded = (searchRequestId, { items }) => ({
  type: types.LOAD_LEADS_SUCCESS,
  searchRequestId,
  items,
});

const loadLeadsFailed = (searchRequestId, { errors }) => ({
  type: types.LOAD_LEADS_FAIL,
  searchRequestId,
  errors,
});

export default searchRequestId => dispatch => {
  dispatch(loadLeadsStarted(searchRequestId));

  const queryParams = {
    filter: {
      propertySearchOrderId: searchRequestId,
      'requestDetails.requestKind': 'selling',
    },
  };

  return API.get('/v1/client_leads', queryParams).then(
    ({ body }) => dispatch(loadLeadsSucceeded(searchRequestId, body)),
    ({ body }) => dispatch(loadLeadsFailed(searchRequestId, body)),
  );
};
