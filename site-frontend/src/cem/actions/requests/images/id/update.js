import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/images/actions';

const updateImageRequestStarted = () => ({
  type: types.UPDATE_IMAGES_REQUEST,
});

const updateImageRequestFailed = ({ errors }) => ({
  type: types.UPDATE_IMAGES_REQUEST_FAIL,
  errors,
});

const updateImageRequestSucceeded = id => ({
  type: types.UPDATE_IMAGES_REQUEST_SUCCESS,
  id,
});

export default function updateImageReuqest(id, data) {
  return (dispatch) => {
    dispatch(updateImageRequestStarted(id));

    return API.put(`/v1/orders/images/${id}`, data)
      .then(() => dispatch(updateImageRequestSucceeded(id)))
      .catch(({ body }) => {
        dispatch(updateImageRequestFailed(body));
        return body;
      });
  };
}
