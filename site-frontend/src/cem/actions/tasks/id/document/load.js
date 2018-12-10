import * as types from 'cem/constants/tasks/actions';
import { API } from 'core/config/sources';

const loadConfirmationStarted = taskId => ({
  type: types.LOAD_DOCUMENT,
  taskId,
});

const loadConfirmationSucceeded = (taskId, data) => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  taskId,
  data,
});

const loadConfirmationFailed = (taskId, { errors }) => ({
  type: types.LOAD_DOCUMENT_FAIL,
  taskId,
  errors,
});

export default function loadConfirmation(taskId) {
  return (dispatch) => {
    dispatch(loadConfirmationStarted(taskId));

    return API.get(`/v1/tasks/${taskId}/document`)
      .then(({ body }) => dispatch(loadConfirmationSucceeded(taskId, body)))
      .catch(({ body, status }) => {
        if (status === 404) {
          dispatch(loadConfirmationSucceeded(taskId, undefined));
        } else {
          dispatch(loadConfirmationFailed(taskId, body));
        }
      });
  };
}
