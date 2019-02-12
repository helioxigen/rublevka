import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/search/actions';

import loadSearchRequest from './load';

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

export default (id, state, data) => dispatch => {
  dispatch(changeStateStarted(id, state, data));

  return API.post(`/v1/properties/orders/search/${id}/${state}`, data)
    .then(() => dispatch(loadSearchRequest(id)))
    .catch(({ body }) => dispatch(changeStateFailed(id, state, body)));
};
