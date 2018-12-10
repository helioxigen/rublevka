import { API } from 'core/config/sources';

import * as types from 'cem/constants/settings/positions/actions';

const loadPositionFailed = (id, errors) => ({
  type: types.LOAD_POSITION_FAIL,
  id,
  errors,
});

const loadPositionSucceeded = (id, data) => ({
  type: types.LOAD_POSITION_SUCCESS,
  id,
  data,
});

export default function loadPosition(id) {
  return dispatch => API.get(`/v1/roles/${id}`).then(
      ({ body }) => Promise.resolve(dispatch(loadPositionSucceeded(id, body))),
      ({ body: { errors } }) => Promise.resolve(dispatch(loadPositionFailed(id, errors))),
    );
}
