import { API } from 'core/config/sources';
import * as types from 'cem/constants/duty/actions';

const loadDutyStarted = id => ({
  type: types.LOAD_DUTY,
  id,
});

const loadDutySucceeded = data => ({
  type: types.LOAD_DUTY_SUCCESS,
  data,
});

export default function loadDuty(id) {
  return dispatch => {
    dispatch(loadDutyStarted(id));

    return API.get(`/v1/daily_duty/${id}`).then(({ body }) =>
      dispatch(loadDutySucceeded(body)),
    );
  };
}
