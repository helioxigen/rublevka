import * as types from 'cem/constants/leads/actions';
import { API } from 'core/config/sources';

import { transformLeadIn } from '../helpers';

const loadLeadStarted = id => ({
  type: types.LOAD_LEAD,
  id,
});

const loadLeadSucceeded = (id, data) => ({
  type: types.LOAD_LEAD_SUCCESS,
  id,
  data,
});

const loadLeadFailed = (id, { errors }) => ({
  type: types.LOAD_LEAD_FAIL,
  errors,
});

export default function loadLead(id) {
  return (dispatch) => {
    dispatch(loadLeadStarted(id));

    return API.get(`/v1/client_leads/${id}`).then(
      ({ body }) => {
        const { requestDetails = {} } = body;
        const transformedBody = requestDetails.requestKind === 'selling' ? transformLeadIn(body) : body;

        dispatch(loadLeadSucceeded(id, transformedBody));
      },
      ({ body }) => dispatch(loadLeadFailed(id, body)),
    );
  };
}
