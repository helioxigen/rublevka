import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/images/actions';

const loadImageRequestStarted = id => ({
  type: types.LOAD_IMAGE_REQUEST,
  id,
});

const loadImageRequestSuccess = (id, data) => ({
  type: types.LOAD_IMAGE_REQUEST_SUCCESS,
  id,
  data,
});

const loadImageRequestFailed = (id, { errors }) => ({
  type: types.LOAD_IMAGE_REQUEST_FAIL,
  id,
  errors,
});

export default function loadImageRequest(id) {
  return (dispatch) => {
    dispatch(loadImageRequestStarted(id));

    return API.get(`/v1/orders/images/${id}`)
      .then(({ body }) => dispatch(loadImageRequestSuccess(id, body)))
      .catch(({ body }) => dispatch(loadImageRequestFailed(id, body)));
  };
}
