import {
  updateElement,
  updateElementStarted,
  updateElementFailed,
  updateElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/settings/exportPackages/actions';
import { resourceName } from 'cem/constants/settings/exportPackages/defaults';

import { transformRequestValues } from 'cem/helpers/exportPackages';

export default data => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE_PACKAGE, data.id));

  return updateElement(resourceName, data.id, transformRequestValues(data)).then(
    () => {
      dispatch(updateElementSucceeded(types.UPDATE_PACKAGE_SUCCEEDED, data.id));

      return data;
    },
    (errors) => {
      dispatch(updateElementFailed(types.UPDATE_PACKAGE_FAILED, data.id, errors));

      return { errors };
    },
  );
};
