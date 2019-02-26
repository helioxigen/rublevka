import * as types from 'cem/constants/leads/actions';
import { API } from 'core/config/sources';

import { pop } from 'cem/actions/toastr';
import loadLead from './load';

const leadServerActions = {
  approve: 'Смена статуса подтверждена',
  disapproved: 'Смуена статуса отклонена',
  in_progress: 'Поступил в обработку',
  process: 'Обработан',
  reject: 'Отклонён',
  spam: 'Помечен как спам',
};

const updateLeadStarted = id => ({
  type: types.PROCESS_LEAD,
  id,
});

const updateLeadFailed = ({ errors }) => ({
  type: types.PROCESS_LEAD_FAIL,
  errors,
});

export default function processLead(id, action, data = {}) {
  return dispatch => {
    dispatch(updateLeadStarted(id));

    return API.post(`/v1/client_leads/${id}/${action}`, data).then(
      () =>
        dispatch(
          pop('success', `Лид (ID: ${id})`, `${leadServerActions[action]}`),
        ) && dispatch(loadLead(id)),
      ({ body }) => {
        dispatch(updateLeadFailed(body));
        return body;
      },
    );
  };
}
