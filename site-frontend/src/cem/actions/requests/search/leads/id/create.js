import * as types from 'cem/constants/requests/search/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';

import { transformLead, transformLeadOut } from 'cem/actions/leads/helpers';

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
};

const createLeadFailed = ({ errors }) => ({
  type: types.CREATE_LEAD_FAIL,
  errors,
});

export default function createLead(searchRequestId, lead) {
  return (dispatch) => {
    dispatch(createLeadStarted());

    const transformedLead =
      lead.requestDetails.requestKind === 'selling' ? transformLeadOut(lead) : transformLead(lead);

    return API.post('/v1/client_leads', transformedLead).then(
      ({ headers }) =>
        API.get(headers.location).then(({ body }) => {
          dispatch(createLeadSucceeded(body.id, body));
          return body;
        }),
      ({ body }) => {
        dispatch(createLeadFailed(body));
        return body;
      },
    );
  };
}
