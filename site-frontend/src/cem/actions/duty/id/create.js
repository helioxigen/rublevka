import { API } from 'core/config/sources';
import * as types from 'cem/constants/duty/actions';

import { prepareFormValuesForSubmit } from 'cem/helpers/duty';

const createDutySucceeded = id => ({
  type: types.CREATE_DUTY_SUCCESS,
  id,
});

export default function createDuty(data) {
  return dispatch =>
    API.post('/v1/daily_duty', prepareFormValuesForSubmit(data)).then(
      ({ headers }) =>
        API.get(headers.location).then(({ body: { id } }) => dispatch(createDutySucceeded(id))),
      ({ body }) => body,
    );
}
