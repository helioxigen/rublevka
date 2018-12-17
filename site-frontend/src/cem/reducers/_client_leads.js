import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/_client_leads/actions';
import {
  listLoadStart,
  listLoadFail,
  listLoadSuccess,

  // elementCreateStart,
  // elementCreateFail,
  // elementCreateSuccess,
  //
  // elementLoadStart,
  // elementLoadFail,
  // elementLoadSuccess,
  //
  // elementUpdateStart,
  // elementUpdateFail,
  // elementUpdateSuccess,
} from 'core/fetcher/reducers';

const initialState = {};

export default handleActions(
  {
    // list
    [types.LOAD_LIST]: (state, { group }) => listLoadStart(state, group),

    [types.LOAD_LIST_FAILED]: (state, { group, errors }) => listLoadFail(state, group, errors),

    [types.LOAD_LIST_SUCCEEDED]: (state, { group, items }) => listLoadSuccess(state, group, items),

    // // create
    // [types.CREATE_CONTACT]: (state) =>
    //   elementCreateStart(state),
    //
    // [types.CREATE_CONTACT_FAILED]: (state) =>
    //   elementCreateFail(state),
    //
    // [types.CREATE_CONTACT_SUCCEEDED]: (state) =>
    //   elementCreateSuccess(state),
    //
    // // read
    // [types.LOAD_CONTACT]: (state, { id }) =>
    //   elementLoadStart(state, id),
    //
    // [types.LOAD_CONTACT_FAILED]: (state, { id, errors }) =>
    //   elementLoadFail(state, id, errors),
    //
    // [types.LOAD_CONTACT_SUCCEEDED]: (state, { id, data }) =>
    //   elementLoadSuccess(state, id, data),
    //
    // // update
    // [types.UPDATE_CONTACT]: (state) =>
    //   elementUpdateStart(state),
    //
    // [types.UPDATE_CONTACT_FAILED]: (state) =>
    //   elementUpdateFail(state),
    //
    // [types.UPDATE_CONTACT_SUCCEEDED]: (state) =>
    //   elementUpdateSuccess(state),
  },
  initialState,
);
