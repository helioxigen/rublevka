import * as types from 'cem/constants/requests/search/actions';
import { API } from 'core/config/sources';

import { transformLeadIn } from 'cem/actions/leads/helpers';

const loadLeadStarted = (searchRequestId, id) => ({
  type: types.LOAD_LEAD,
  searchRequestId,
  id,
});

const loadLeadSucceeded = (searchRequestId, id, data) => ({
  type: types.LOAD_LEAD_SUCCESS,
  searchRequestId,
  id,
  data,
});

const loadLeadFailed = (searchRequestId, id, { errors }) => ({
  type: types.LOAD_LEAD_FAIL,
  searchRequestId,
  errors,
});

export default function loadLead(searchRequestId, id) {
  return (dispatch) => {
    dispatch(loadLeadStarted(searchRequestId, id));

    return API.get(`/v1/client_leads/${id}`).then(
      ({ body }) => {
        const { requestDetails = {} } = body;
        const transformedBody =
          requestDetails.requestKind === 'selling' ? transformLeadIn(body) : body;

        dispatch(loadLeadSucceeded(searchRequestId, id, transformedBody));
      },
      ({ body }) => dispatch(loadLeadFailed(searchRequestId, id, body)),
    );
  };
}
