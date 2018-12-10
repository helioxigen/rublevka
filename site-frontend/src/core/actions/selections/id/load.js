import { loadElement, loadElementStarted, loadElementFailed, loadElementSucceeded } from 'core/fetcher/actions';

import * as types from 'core/constants/selections/actions';
import { resourceName } from 'core/constants/selections/defaults';

const loadSelection = id => (dispatch) => {
  dispatch(loadElementStarted(types.LOAD_SELECTION, id));

  return loadElement(resourceName, id)
    .then(
      (data) => {
        dispatch(loadElementSucceeded(types.LOAD_SELECTION_SUCCEEDED, id, data));

        return data;
      }, (errors) => {
        dispatch(loadElementFailed(types.LOAD_SELECTION_FAILED, id, errors));

        return errors;
      },
    );
};

export default loadSelection;
