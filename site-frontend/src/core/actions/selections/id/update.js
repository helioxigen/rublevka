import { updateElement, updateElementStarted, updateElementFailed, updateElementSucceeded } from 'core/fetcher/actions';

import * as types from 'core/constants/selections/actions';
import { resourceName } from 'core/constants/selections/defaults';

const updateSelection = (id, data) => (dispatch) => {
  dispatch(updateElementStarted(types.UPDATE_SELECTION, id));

  return updateElement(resourceName, id, data)
    .then(() => {
      dispatch(updateElementSucceeded(types.UPDATE_SELECTION_SUCCEEDED, id));
      return data;
    }, (errors) => {
      dispatch(updateElementFailed(types.UPDATE_SELECTION_FAILED, id, errors));
      return { errors };
    });
};

export default updateSelection;
