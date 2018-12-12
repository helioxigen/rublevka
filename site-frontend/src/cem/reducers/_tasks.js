import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/_tasks/actions';

import * as reducers from 'core/fetcher/reducers';

const initialState = {};

export default handleActions({
  [types.LOAD_TASKS]: (state, { group }) => reducers.listLoadStart(state, group),

  [types.LOAD_TASKS_FAILED]: (state, { group, errors }) => reducers.listLoadFail(state, group, errors),

  [types.LOAD_TASKS_SUCCEEDED]: (state, { group, items }) => reducers.listLoadSuccess(state, group, items),

  [types.LOAD_TASK]: (state, { id }) => reducers.elementLoadStart(state, id),

  [types.LOAD_TASK_FAILED]: (state, { id, errors }) => reducers.elementLoadFail(state, id, errors),

  [types.LOAD_TASK_SUCCEEDED]: (state, { id, data }) => reducers.elementLoadSuccess(state, id, data),

  [types.UPDATE_TASK]: state => reducers.elementUpdateStart(state),

  [types.UPDATE_TASK_FAILED]: state => reducers.elementUpdateFail(state),

  [types.UPDATE_TASK_SUCCEEDED]: state => reducers.elementUpdateSuccess(state),
}, initialState);
