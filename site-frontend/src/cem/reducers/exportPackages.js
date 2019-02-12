import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/settings/exportPackages/actions';

import * as reducers from 'core/fetcher/reducers';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_PACKAGES]: (state, { group }) =>
      reducers.listLoadStart(state, group),

    [types.LOAD_PACKAGES_FAILED]: (state, { group, errors }) =>
      reducers.listLoadFail(state, group, errors),

    [types.LOAD_PACKAGES_SUCCEEDED]: (state, { group, items }) =>
      reducers.listLoadSuccess(state, group, items),

    [types.LOAD_PACKAGE]: (state, { id }) =>
      reducers.elementLoadStart(state, id),

    [types.LOAD_PACKAGE_FAILED]: (state, { id, errors }) =>
      reducers.elementLoadFail(state, id, errors),

    [types.LOAD_PACKAGE_SUCCEEDED]: (state, { id, data }) =>
      reducers.elementLoadSuccess(state, id, data),

    [types.LOAD_PACKAGE_ERROR_LOGS]: (state, { resourceId, listName }) =>
      reducers.linkedListLoadStart(state, resourceId, listName),

    [types.LOAD_PACKAGE_ERROR_LOGS_FAILED]: (
      state,
      { resourceId, listName, errors },
    ) => reducers.linkedListLoadFail(state, resourceId, listName, errors),

    [types.LOAD_PACKAGE_ERROR_LOGS_SUCCEEDED]: (
      state,
      { resourceId, listName, items },
    ) => reducers.linkedListLoadSuccess(state, resourceId, listName, items),

    [types.CREATE_PACKAGE]: state => reducers.elementCreateStart(state),

    [types.CREATE_PACKAGE_FAILED]: state => reducers.elementCreateFail(state),

    [types.CREATE_PACKAGE_SUCCEEDED]: state =>
      reducers.elementCreateSuccess(state),

    [types.UPDATE_PACKAGE]: state => reducers.elementUpdateStart(state),

    [types.UPDATE_PACKAGE_FAILED]: state => reducers.elementUpdateFail(state),

    [types.UPDATE_PACKAGE_SUCCEEDED]: state =>
      reducers.elementUpdateSuccess(state),
  },
  initialState,
);
