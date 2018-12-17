import { API } from 'core/config/sources';

import * as types from 'cem/constants/tasks/actions';

const createTaskSucceeded = id => ({
  type: types.CREATE_TASK_SUCCESS,
  id,
});

export default function createTask(data) {
  return dispatch =>
    API.post('/v1/tasks', data).then(
      ({ headers }) =>
        API.get(headers.location).then(({ body: { id } }) => dispatch(createTaskSucceeded(id))),
      ({ body }) => body,
    );
}
