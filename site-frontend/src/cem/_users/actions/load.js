import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_users/constants/actions';
import { apiPath } from 'cem/_users/constants/defaults';

import { transformInputValues } from 'cem/_users/helpers/transformInputValues';

const load = id => dispatch => {
  dispatch(loadElementStarted(types.LOAD, id));

  return loadElement(apiPath, id).then(
    data => {
      const values = transformInputValues(data);

      dispatch(loadElementSucceeded(types.LOAD_SUCCEEDED, id, values));

      return values;
    },
    errors => {
      dispatch(loadElementFailed(types.LOAD_FAILED, id, errors));

      return errors;
    },
  );
};

export default load;
