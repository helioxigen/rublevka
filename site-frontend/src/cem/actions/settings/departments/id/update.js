import { API } from 'core/config/sources';
import * as types from 'cem/constants/settings/departments/actions';

import { pop } from 'cem/actions/toastr';

const updateDepartmentSucceeded = id => dispatch => {
  dispatch(pop('success', 'Департамент обновлен!'));

  return dispatch({
    type: types.UPDATE_DEPARTMENT_SUCCESS,
    id,
  });
};

export default function updateDepartment(id, data) {
  return dispatch =>
    API.put(`/v1/departments/${id}`, data).then(
      () => dispatch(updateDepartmentSucceeded(id)),
      ({ body }) => {
        dispatch(pop('danger', 'Ошибка обновления департамента!'));
        return body;
      },
    );
}
