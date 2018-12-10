import { API } from 'core/config/sources';

import * as types from 'cem/constants/tasks/actions';

const updateTaskSucceeded = id => ({
  type: types.UPDATE_TASK_SUCCESS,
  id,
});

export default function updateTask(id, data) {
  return dispatch => API.put(`/v1/tasks/${id}`, data).then(
      () => dispatch(updateTaskSucceeded(id)),
      ({ body }) => body,
    );
}
