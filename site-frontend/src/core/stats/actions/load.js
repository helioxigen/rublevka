import { loadElementStarted, loadElementFailed } from 'core/fetcher2/actions';
import { API } from 'core/config/sources';

import * as types from 'core/stats/constants/actions';
import { apiPath } from 'core/stats/constants/defaults';

const load = id => (dispatch) => {
  dispatch(loadElementStarted(types.LOAD, id));

  return API.get(apiPath)
    .then(
      (data) => {
        dispatch({ type: types.LOAD_SUCCEEDED, data: data.body });

        return data;
      }, (errors) => {
        dispatch(loadElementFailed(types.LOAD_FAILED, id, errors));

        return errors;
      },
    );
};

export default load;
