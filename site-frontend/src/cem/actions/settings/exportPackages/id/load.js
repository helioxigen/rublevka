import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/settings/exportPackages/actions';
import { resourceName } from 'cem/constants/settings/exportPackages/defaults';

export default id => (dispatch) => {
  dispatch(loadElementStarted(types.LOAD_PACKAGE, id));

  return loadElement(resourceName, id).then(
    (data) => {
      dispatch(loadElementSucceeded(types.LOAD_PACKAGE_SUCCEEDED, id, data));

      return data;
    },
    (errors) => {
      dispatch(loadElementFailed(types.LOAD_PACKAGE_FAILED, id, errors));

      return errors;
    },
  );
};
