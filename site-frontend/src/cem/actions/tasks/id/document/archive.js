import * as types from 'cem/constants/tasks/actions';
import { API } from 'core/config/sources';

import loadConfirmation from './load';

const archiveConfirmationStarted = taskId => ({
  type: types.ARCHIVE_DOCUMENT,
  taskId,
});

const archiveConfirmationFailed = (taskId, { errors }) => ({
  type: types.ARCHIVE_DOCUMENT_FAIL,
  taskId,
  errors,
});

export default function archiveConfirmation(taskId) {
  return (dispatch) => {
    dispatch(archiveConfirmationStarted(taskId));

    return API.post(`/v1/tasks/${taskId}/document/archive`)
      .then(() => dispatch(loadConfirmation(taskId)))
      .catch(({ body }) => dispatch(archiveConfirmationFailed(taskId, body)));
  };
}
