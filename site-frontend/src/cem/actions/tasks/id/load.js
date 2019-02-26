import { API } from 'core/config/sources';
import * as types from 'cem/constants/tasks/actions';

const loadTaskStarted = id => ({
  type: types.LOAD_TASK,
  id,
});

const loadTaskSucceeded = data => ({
  type: types.LOAD_TASK_SUCCESS,
  data,
});

export default function loadTask(id) {
  return dispatch => {
    dispatch(loadTaskStarted(id));

    return API.get(`/v1/tasks/${id}`).then(({ body }) =>
      dispatch(loadTaskSucceeded(body)),
    );
  };
}
