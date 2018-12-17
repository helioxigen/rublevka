import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'core/places/constants/actions';
import { apiPathByGroup } from 'core/places/constants/defaults';

const load = (id, placeKind) => (dispatch) => {
  dispatch(loadElementStarted(types.LOAD, id));

  const apiPath = apiPathByGroup[placeKind];

  return loadElement(apiPath, id).then(
    (data) => {
      dispatch(loadElementSucceeded(types.LOAD_SUCCEEDED, id, data));

      return data;
    },
    (errors) => {
      dispatch(loadElementFailed(types.LOAD_FAILED, id, errors));

      return errors;
    },
  );
};

export default load;
