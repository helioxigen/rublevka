import * as types from 'cem/constants/leads/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import loadLead from './load';
import { transformLead, transformLeadOut } from '../helpers';

const updateLeadStarted = (id, lead) => ({
  type: types.UPDATE_LEAD,
  id,
  lead,
});

const updateLeadFailed = ({ errors }) => ({
  type: types.UPDATE_LEAD_FAIL,
  errors,
});

export default function updateLead(id, lead) {
  return dispatch => {
    dispatch(updateLeadStarted(id, lead));

    const requestKind = lead.requestDetails && lead.requestDetails.requestKind;
    const transformedLead =
      (requestKind &&
        (requestKind === 'selling'
          ? transformLeadOut(lead)
          : transformLead(lead))) ||
      lead;

    return API.put(`/v1/client_leads/${id}`, transformedLead).then(
      () =>
        dispatch(pop('success', `Лид (ID: ${id})`, 'Успешно обновлён')) &&
        dispatch(loadLead(id)),
      ({ body }) => {
        dispatch(updateLeadFailed(body));
        return body;
      },
    );
  };
}
