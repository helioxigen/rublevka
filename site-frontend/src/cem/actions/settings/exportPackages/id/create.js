import {
  createElement,
  createElementStarted,
  createElementFailed,
  createElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/constants/settings/exportPackages/actions';
import { resourceName } from 'cem/constants/settings/exportPackages/defaults';

import { transformRequestValues } from 'cem/helpers/exportPackages';

export default data => (dispatch) => {
  dispatch(createElementStarted(types.CREATE_PACKAGE));

  return createElement(resourceName, transformRequestValues(data)).then(
    ({ id }) => {
      dispatch(createElementSucceeded(types.CREATE_PACKAGE_SUCCEEDED, id));

      return { id };
    },
    (errors) => {
      dispatch(createElementFailed(types.CREATE_PACKAGE_FAILED, errors));

      return { errors };
    },
  );
};
