import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/remove/actions';
import { pop } from 'cem/actions/toastr';

import loadRemovalRequest from './load';

const changeStateStarted = (id, state) => ({
  type: types.CHANGE_STATE,
  id,
  state,
});

const changeStateFailed = (id, state, { errors }) => ({
  type: types.CHANGE_STATE_FAIL,
  id,
  state,
  errors,
});

export default function changeState(id, state, data) {
  return (dispatch) => {
    dispatch(changeStateStarted(id, state, data));

    return API.post(`/v1/properties/orders/removal/${id}/${state}`, data)
      .then(() => dispatch(pop('success', `Заявка (ID: ${id})`, 'Статус изменён')) && dispatch(loadRemovalRequest(id)))
      .catch(({ body }) => dispatch(changeStateFailed(id, state, body)));
  };
}
