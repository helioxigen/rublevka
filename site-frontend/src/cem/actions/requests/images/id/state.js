import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/images/actions';

import loadImageRequest from './load';

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
  return dispatch => {
    dispatch(changeStateStarted(id, state, data));

    return API.post(`/v1/orders/images/${id}/${state}`, data)
      .then(() => dispatch(loadImageRequest(id)))
      .catch(({ body }) => dispatch(changeStateFailed(id, state, body)));
  };
}
