import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/remove/actions';

const loadRemovalRequestStarted = id => ({
  type: types.LOAD_REMOVAL_REQUEST,
  id,
});

const loadRemovalRequestSuccess = (id, data) => ({
  type: types.LOAD_REMOVAL_REQUEST_SUCCESS,
  id,
  data,
});

const loadRemovalRequestFailed = (id, { errors }) => ({
  type: types.LOAD_REMOVAL_REQUEST_FAIL,
  id,
  errors,
});

export default function loadRemovalRequest(id) {
  return dispatch => {
    dispatch(loadRemovalRequestStarted(id));

    return API.get(`/v1/properties/orders/removal/${id}`)
      .then(({ body }) => dispatch(loadRemovalRequestSuccess(id, body)))
      .catch(({ body }) => dispatch(loadRemovalRequestFailed(id, body)));
  };
}
