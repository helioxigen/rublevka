import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/_tasks/actions';
import { resourceName } from 'cem/constants/_tasks/defaults';

const loadTask = id => dispatch => {
  dispatch(loadElementStarted(types.LOAD_TASK, id));

  return loadElement(resourceName, id).then(
    data => {
      dispatch(loadElementSucceeded(types.LOAD_TASK_SUCCEEDED, id, data));

      return data;
    },
    errors => {
      dispatch(loadElementFailed(types.LOAD_TASK_FAILED, id, errors));

      return errors;
    },
  );
};

export default loadTask;
