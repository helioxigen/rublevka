import { updateElement, updateElementStarted, updateElementFailed, updateElementSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/constants/_tasks/actions';
import { resourceName } from 'cem/constants/_tasks/defaults';

const updateTask = (id, data) => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE_TASK, id));

  return updateElement(resourceName, id, data)
    .then(() => {
      dispatch(updateElementSucceeded(types.UPDATE_TASK_SUCCEEDED, id));
      return data;
    }, (errors) => {
      dispatch(updateElementFailed(types.UPDATE_TASK_FAILED, id, errors));
      return { errors };
    });
};

export default updateTask;
