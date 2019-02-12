import { API } from 'core/config/sources';

import * as types from 'cem/constants/settings/divisions/actions';

const loadDivisionFailed = (id, errors) => dispatch =>
  dispatch({
    type: types.LOAD_DIVISION_FAIL,
    id,
    errors,
  });

const loadDivisionSucceeded = (id, data) => dispatch =>
  dispatch({
    type: types.LOAD_DIVISION_SUCCESS,
    id,
    data,
  });

export default function loadDivision(id) {
  return dispatch =>
    API.get(`/v1/divisions/${id}`).then(
      ({ body }) => Promise.resolve(dispatch(loadDivisionSucceeded(id, body))),
      ({ body: { errors } }) =>
        Promise.resolve(dispatch(loadDivisionFailed(id, errors))),
    );
}
