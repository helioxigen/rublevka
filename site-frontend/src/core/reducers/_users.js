import { handleActions } from 'redux-actions';

import * as reducers from 'core/fetcher/reducers';

import * as types from 'core/constants/_users/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_USERS]: (state, { group, append }) => reducers.listLoadStart(state, group, append),

    [types.LOAD_USERS_FAILED]: (state, { group, errors }) =>
      reducers.listLoadFail(state, group, errors),

    [types.LOAD_USERS_SUCCEEDED]: (state, { group, items, append }) =>
      reducers.listLoadSuccess(state, group, items, append),
  },
  initialState,
);
