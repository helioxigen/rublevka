import { handleActions } from 'redux-actions';

import * as reducers from 'core/fetcher/reducers';

import * as types from 'core/constants/settlements/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_SETTLEMENTS]: (state, { group }) => reducers.listLoadStart(state, group),

    [types.LOAD_SETTLEMENTS_FAILED]: (state, { group, errors }) =>
      reducers.listLoadFail(state, group, errors),

    [types.LOAD_SETTLEMENTS_SUCCEEDED]: (state, { group, items }) =>
      reducers.listLoadSuccess(state, group, items),

    [types.LOAD_SETTLEMENT]: (state, { id }) => reducers.elementLoadStart(state, id),

    [types.LOAD_SETTLEMENT_FAILED]: (state, { id, errors }) =>
      reducers.elementLoadFail(state, id, errors),

    [types.LOAD_SETTLEMENT_SUCCEEDED]: (state, { id, data }) =>
      reducers.elementLoadSuccess(state, id, data),
  },
  initialState,
);
