import { updateElement, updateElementStarted, updateElementFailed, updateElementSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/_users/constants/actions';
import { resourceName } from 'cem/_users/constants/defaults';

const update = data => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE, data.id));

  return updateElement(resourceName, data.id, data)
    .then(
      () => {
        dispatch(updateElementSucceeded(types.UPDATE_SUCCEEDED, data.id, data));

        return data;
      }, (errors) => {
        dispatch(updateElementFailed(types.UPDATE_FAILED, data.id, errors));
        return { errors };
      },
    );
};

export default update;
