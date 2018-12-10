import * as types from 'cem/constants/tasks/actions';
import { uploadFile } from '../../helpers';

import loadConfirmation from './load';

const uploadConfirmationStarted = taskId => ({
  type: types.UPLOAD_DOCUMENT,
  taskId,
});

const uploadConfirmationFailed = (taskId, { errors }) => ({
  type: types.UPLOAD_DOCUMENT_FAIL,
  taskId,
  errors,
});

export default function uploadConfirmation(taskId, file) {
  return (dispatch) => {
    dispatch(uploadConfirmationStarted(taskId));

    return uploadFile(taskId, file)
      .then(() => dispatch(loadConfirmation(taskId)))
      .catch(({ body }) => dispatch(uploadConfirmationFailed(taskId, body)));
  };
}
