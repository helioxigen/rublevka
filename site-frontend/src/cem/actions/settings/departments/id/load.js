import { API } from 'core/config/sources';

import * as types from 'cem/constants/settings/departments/actions';

const loadDepartmentFailed = (id, errors) => dispatch => dispatch({
  type: types.LOAD_DEPARTMENT_FAIL,
  id,
  errors,
});

const loadDepartmentSucceeded = (id, data) => dispatch => dispatch({
  type: types.LOAD_DEPARTMENT_SUCCESS,
  id,
  data,
});

export default function loadDepartment(id) {
  return dispatch => API.get(`/v1/departments/${id}`).then(
      ({ body }) => Promise.resolve(dispatch(loadDepartmentSucceeded(id, body))),
      ({ body: { errors } }) => Promise.resolve(dispatch(loadDepartmentFailed(id, errors))),
    );
}
