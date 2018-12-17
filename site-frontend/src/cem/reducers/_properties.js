import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/_properties/actions';

import * as reducers from 'core/fetcher/reducers';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_PROPERTIES]: (state, { group }) => reducers.listLoadStart(state, group),

    [types.LOAD_PROPERTIES_FAILED]: (state, { group, errors }) =>
      reducers.listLoadFail(state, group, errors),

    [types.LOAD_PROPERTIES_SUCCEEDED]: (state, { group, items }) =>
      reducers.listLoadSuccess(state, group, items),
  },
  initialState,
);
