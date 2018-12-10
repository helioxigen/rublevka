import { update, updateStarted, updateFailed, updateSucceeded } from 'core/fetcher2/actions/updateState';

import * as types from 'cem/_tasks/constants/actions';
import { apiPath } from 'cem/_tasks/constants/defaults';

export default (id: number | string, toState: string) => (dispatch) => {
  dispatch(updateStarted(types.UPDATE_STATE, id, toState));

  return new Promise((resolve, reject) => {
    update(apiPath, id, toState)
      .then(response => {
        dispatch(updateSucceeded(types.UPDATE_STATE_SUCCEEDED, id, toState, response));

        return resolve(response);
      }, (response) => {
        dispatch(updateFailed(types.UPDATE_STATE_FAILED, id, toState, response));

        return reject(response);
      }
      );
  });
};
