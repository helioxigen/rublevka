import {
  update,
  updateStarted,
  updateFailed,
  updateSucceeded,
} from 'core/fetcher2/actions/updateState';

import * as types from 'cem/_client_leads/constants/actions';
import { apiPath } from 'cem/_client_leads/constants/defaults';

import recursiveCleanUp from 'core/helpers/recursiveCleanUp';
import transformUpdateStateValues from 'cem/_client_leads/helpers/transformUpdateStateValues';

export default (id: number | string, toState: string, values) => (dispatch) => {
  dispatch(updateStarted(types.UPDATE_STATE, id, toState, values));

  return new Promise((resolve, reject) =>
    update(apiPath, id, toState, recursiveCleanUp(transformUpdateStateValues(values))).then(
      (response) => {
        dispatch(updateSucceeded(types.UPDATE_STATE_SUCCEEDED, id, toState, response));

        return resolve(response);
      },
      (response) => {
        dispatch(updateFailed(types.UPDATE_STATE_FAILED, id, toState, response));

        return reject(response);
      },
    ),
  );
};
