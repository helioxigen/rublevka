import * as types from 'cem/constants/settings/departments/actions';
import { API } from 'core/config/sources';

import { updatePagination } from 'core/actions/pagination';

const loadDepartmentsStarted = params => ({
  type: types.LOAD_DEPARTMENTS,
  params,
});

const loadDepartmentsSucceeded = ({ items, pagination }) => (dispatch) => {
  dispatch(updatePagination('roles', pagination));

  dispatch({
    type: types.LOAD_DEPARTMENTS_SUCCESS,
    items,
  });
};

const loadDepartmentsFailed = ({ errors }) => ({
  type: types.LOAD_DEPARTMENTS_FAIL,
  errors,
});

export default function loadDepartments(queryParams = {}) {
  return (dispatch) => {
    dispatch(loadDepartmentsStarted(queryParams));

    return API.get('/v1/departments', queryParams).then(
      ({ body }) => dispatch(loadDepartmentsSucceeded(body)),
      ({ body }) => dispatch(loadDepartmentsFailed(body)),
    );
  };
}
