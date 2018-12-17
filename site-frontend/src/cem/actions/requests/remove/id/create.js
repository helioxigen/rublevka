import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/remove/actions';
import { pop } from 'cem/actions/toastr';

const createRemovalRequestStarted = () => ({
  type: types.CREATE_REMOVAL_REQUEST,
});

const createRemovalRequestSucceeded = data => ({
  type: types.CREATE_REMOVAL_REQUEST_SUCCESS,
  id: data.id,
  data,
});

const createRemovalRequestFailed = ({ errors }) => ({
  type: types.CREATE_REMOVAL_REQUEST_FAIL,
  errors,
});

export default function createRemovalRequest(data) {
  return (dispatch) => {
    dispatch(createRemovalRequestStarted());

    return API.post('/v1/properties/orders/removal', data)
      .then(({ headers }) =>
        API.get(headers.location).then(
          ({ body }) =>
            dispatch(pop('success', `Заявка (ID: ${body.id})`, 'Успешно создана')) &&
            dispatch(createRemovalRequestSucceeded(body)),
        ),
      )
      .catch(({ body }) => {
        dispatch(createRemovalRequestFailed(body));
        return body;
      });
  };
}
