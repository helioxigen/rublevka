import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from '../../jq-redux-api/actions';

import * as types from '../constants/actions';
import { apiPath, initialElementScheme } from '../constants/defaults';

const load = id => dispatch => {
  dispatch(loadElementStarted(types.LOAD, id, initialElementScheme));

  return loadElement(apiPath, id).then(
    data => {
      dispatch(loadElementSucceeded(types.LOAD_SUCCEEDED, id, data));

      return data;
    },
    errors => {
      dispatch(loadElementFailed(types.LOAD_FAILED, id, errors));

      return Promise.reject(errors);
    },
  );
};

export default load;
