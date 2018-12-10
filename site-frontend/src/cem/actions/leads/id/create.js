import * as types from 'cem/constants/leads/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import { pushPath } from 'redux-simple-router';

import { transformLead, transformLeadOut } from '../helpers';

const createLeadStarted = () => ({
  type: types.CREATE_LEAD,
});

const createLeadSucceeded = (id, data) => (dispatch) => {
  dispatch({
    type: types.CREATE_LEAD_SUCCESS,
    id,
    data,
  });

  dispatch(pop('success', `Лид (ID: ${id})`, 'Успешно создан'));
  return dispatch(pushPath(`/client_leads/${data.kind}/${id}`));
};

const createLeadFailed = ({ errors }) => ({
  type: types.CREATE_LEAD_FAIL,
  errors,
});

export default function createLead(lead) {
  return (dispatch) => {
    dispatch(createLeadStarted());

    const transformedLead = lead.requestDetails.requestKind === 'selling' ? transformLeadOut(lead) : transformLead(lead);

    return API.post('/v1/client_leads', transformedLead).then(
      ({ headers }) => API.get(headers.location).then(
        ({ body }) => dispatch(createLeadSucceeded(body.id, body)),
      ),
      ({ body }) => {
        dispatch(createLeadFailed(body));
        return body;
      },
    );
  };
}
