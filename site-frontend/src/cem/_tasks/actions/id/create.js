import {
  createElement,
  createElementStarted,
  createElementFailed,
  createElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/_tasks/constants/actions';
import { resourceName } from 'cem/_tasks/constants/defaults';

const create = data => (dispatch) => {
  dispatch(createElementStarted(types.CREATE));

  return createElement(resourceName, data).then(
    ({ id }) => {
      dispatch(createElementSucceeded(types.CREATE_SUCCEEDED, id));

      return { id };
    },
    (errors) => {
      dispatch(createElementFailed(types.CREATE_FAILED, errors));
      return { errors };
    },
  );
};

export default create;
