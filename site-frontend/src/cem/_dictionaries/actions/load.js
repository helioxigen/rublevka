import { loadElement, loadElementStarted, loadElementFailed, loadElementSucceeded } from 'core/fetcher/actions';

import * as types from 'cem/_dictionaries/constants/actions';
import { resourceName } from 'cem/_dictionaries/constants/defaults';

const load = id => (dispatch) => {
  dispatch(loadElementStarted(types.LOAD, id));

  return loadElement(resourceName, id)
    .then(
      (data) => {
        dispatch(loadElementSucceeded(types.LOAD_SUCCEEDED, id, data));

        return data;
      }, (errors) => {
        dispatch(loadElementFailed(types.LOAD_FAILED, id, errors));

        return errors;
      },
    );
};

export default load;
