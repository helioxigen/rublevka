import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'core/users/constants/actions';
import { apiPath } from 'core/users/constants/defaults';

const load = id => dispatch => {
  dispatch(loadElementStarted(types.LOAD, id));

  return loadElement(apiPath, id).then(
    data => {
      dispatch(loadElementSucceeded(types.LOAD_SUCCEEDED, id, data));

      return data;
    },
    errors => {
      dispatch(loadElementFailed(types.LOAD_FAILED, id, errors));

      return errors;
    },
  );
};

export default load;
