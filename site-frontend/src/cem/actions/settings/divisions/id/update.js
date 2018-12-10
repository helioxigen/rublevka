import { API } from 'core/config/sources';
import * as types from 'cem/constants/settings/divisions/actions';

import { pop } from 'cem/actions/toastr';

const updateDivisionSucceeded = id => ({
  type: types.UPDATE_DIVISION_SUCCESS,
  id,
});

export default function updateDivision(id, data) {
  return dispatch => API.put(`/v1/divisions/${id}`, data).then(
      () => dispatch(updateDivisionSucceeded(id)),
      ({ body }) => {
        dispatch(pop('danger', 'Ошибка обновления отдела!'));
        return body;
      },
    );
}
