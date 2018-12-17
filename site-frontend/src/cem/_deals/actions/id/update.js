import {
  updateElement,
  updateElementStarted,
  updateElementFailed,
  updateElementSucceeded,
} from 'core/fetcher/actions';

import * as types from 'cem/_deals/constants/actions';
import { resourceName } from 'cem/_deals/constants/defaults';

const update = data => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE, data.id));

  return updateElement(resourceName, data.id, data).then(
    () => {
      dispatch(updateElementSucceeded(types.UPDATE_SUCCEEDED, data.id));

      return data;
    },
    (errors) => {
      dispatch(updateElementFailed(types.UPDATE_FAILED, data.id, errors));
      return { errors };
    },
  );
};

export default update;
