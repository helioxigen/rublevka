import * as types from 'cem/constants/tasks/actions';
import { API } from 'core/config/sources';

import loadConfirmation from './load';

const deleteConfirmationStarted = taskId => ({
  type: types.DELETE_DOCUMENT,
  taskId,
});

const deleteConfirmationFailed = (taskId, { errors }) => ({
  type: types.DELETE_DOCUMENT_FAIL,
  taskId,
  errors,
});

export default function deleteConfirmation(taskId) {
  return dispatch => {
    dispatch(deleteConfirmationStarted(taskId));

    return API.del(`/v1/tasks/${taskId}/document`)
      .then(() => dispatch(loadConfirmation(taskId)))
      .catch(({ body }) => dispatch(deleteConfirmationFailed(taskId, body)));
  };
}
