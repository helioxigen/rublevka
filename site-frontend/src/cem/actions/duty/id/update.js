import { API } from 'core/config/sources';
import * as types from 'cem/constants/duty/actions';

import { prepareFormValuesForSubmit } from 'cem/helpers/duty';

const updateDutySucceeded = id => ({
  type: types.UPDATE_DUTY_SUCCESS,
  id,
});

export default function updateDuty(id, data) {
  return dispatch =>
    API.put(`/v1/daily_duty/${id}`, prepareFormValuesForSubmit(data)).then(
      () => dispatch(updateDutySucceeded(id)),
      ({ body }) => body,
    );
}
