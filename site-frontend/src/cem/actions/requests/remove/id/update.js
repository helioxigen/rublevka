import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/remove/actions';
import { pop } from 'cem/actions/toastr';

const updateRemovalRequestStarted = () => ({
  type: types.UPDATE_REMOVAL_REQUEST,
});

const updateRemovalRequestFailed = ({ errors }) => ({
  type: types.UPDATE_REMOVAL_REQUEST_FAIL,
  errors,
});

const updateRemovalRequestSucceeded = id => ({
  type: types.UPDATE_REMOVAL_REQUEST_SUCCESS,
  id,
});

export default (id, data) => dispatch => {
  dispatch(updateRemovalRequestStarted(id));

  return API.put(`/v1/properties/orders/removal/${id}`, data)
    .then(
      () =>
        dispatch(pop('success', `Заявка (ID: ${id})`, 'Успешно обновлена')) &&
        dispatch(updateRemovalRequestSucceeded(id)),
    )
    .catch(({ body }) => {
      dispatch(updateRemovalRequestFailed(body));
      return body;
    });
};
