import { handleActions } from 'redux-actions';

import * as reducers from 'core/fetcher/reducers';

import * as types from 'cem/constants/_users/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_USERS]: (state, { group }) =>
      reducers.listLoadStart(state, group),

    [types.LOAD_USERS_FAILED]: (state, { group, errors }) =>
      reducers.listLoadFail(state, group, errors),

    [types.LOAD_USERS_SUCCEEDED]: (state, { group, items }) =>
      reducers.listLoadSuccess(state, group, items),
  },
  initialState,
);
