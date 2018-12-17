import { API } from 'core/config/sources';
import * as types from 'cem/constants/settings/positions/actions';

import { pop } from 'cem/actions/toastr';

const updatePositionSucceeded = id => (dispatch) => {
  dispatch(pop('success', 'Роль обновлена!'));

  return dispatch({
    type: types.UPDATE_POSITION_SUCCESS,
    id,
  });
};

export default function updatePosition(id, data) {
  return dispatch =>
    API.put(`/v1/roles/${id}`, data).then(
      () => dispatch(updatePositionSucceeded(id)),
      ({ body }) => {
        dispatch(pop('danger', 'Ошибка обновления роли!'));
        return body;
      },
    );
}
