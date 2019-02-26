import {
  createElement,
  createElementStarted,
  createElementFailed,
  createElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'core/constants/selections/actions';
import { resourceName } from 'core/constants/selections/defaults';

const createSelection = data => dispatch => {
  dispatch(createElementStarted(types.CREATE_SELECTION));

  return createElement(resourceName, data).then(
    ({ id }) => {
      dispatch(createElementSucceeded(types.CREATE_SELECTION_SUCCEEDED, id));
      return { id };
    },
    errors => {
      dispatch(createElementFailed(types.CREATE_SELECTION_FAILED, errors));
      return { errors };
    },
  );
};

export default createSelection;
