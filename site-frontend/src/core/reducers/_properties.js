import { handleActions } from 'redux-actions';

import * as types from 'core/constants/_properties/actions';

import * as reducers from 'core/fetcher/reducers';

const initialState = {};

export default handleActions({
  [types.LOAD_PROPERTIES]: (state, { group, append }) =>
    reducers.listLoadStart(state, group, append),

  [types.LOAD_PROPERTIES_FAILED]: (state, { group, errors }) =>
    reducers.listLoadFail(state, group, errors),

  [types.LOAD_PROPERTIES_SUCCEEDED]: (state, { group, items, append }) =>
    reducers.listLoadSuccess(state, group, items, append),
}, initialState);
