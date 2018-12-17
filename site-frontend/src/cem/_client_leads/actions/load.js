import {
  loadElement,
  loadElementStarted,
  loadElementFailed,
  loadElementSucceeded,
} from 'core/fetcher2/actions';

import * as types from 'cem/_client_leads/constants/actions';
import { apiPath } from 'cem/_client_leads/constants/defaults';

import { transformInputValues } from 'cem/_client_leads/helpers/transformInputValues';

const load = id => (dispatch) => {
  dispatch(loadElementStarted(types.LOAD, id));

  return loadElement(apiPath, id).then(
    (data) => {
      const values = transformInputValues(data);

      dispatch(loadElementSucceeded(types.LOAD_SUCCEEDED, id, values));

      return values;
    },
    (errors) => {
      dispatch(loadElementFailed(types.LOAD_FAILED, id, errors));

      return errors;
    },
  );
};

export default load;
