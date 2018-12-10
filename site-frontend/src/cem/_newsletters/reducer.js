import { handleActions } from 'redux-actions';

import * as types from 'cem/_newsletters/constants/actions';

import {
  listLoadStart,
  listLoadFail,
  listLoadSuccess,
  elementLoadStart,
  elementLoadFail,
  elementLoadSuccess,
  elementCreateStart,
  elementCreateFail,
  elementCreateSuccess,
} from 'core/fetcher2/reducers';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_NEWSLETTERS]: (state, { group }) => listLoadStart(state, group),
    [types.LOAD_NEWSLETTERS_FAILED]: (state, { group, errors }) =>
      listLoadFail(state, group, errors),
    [types.LOAD_NEWSLETTERS_SUCCEEDED]: (state, { group, items }) =>
      listLoadSuccess(state, group, items),

    [types.LOAD_NEWSLETTER]: (state, { id }) => elementLoadStart(state, id),
    [types.LOAD_NEWSLETTER_FAILED]: (state, { id, errors }) =>
      elementLoadFail(state, id, errors),
    [types.LOAD_NEWSLETTER_SUCCEEDED]: (state, { id, data }) =>
      elementLoadSuccess(state, id, data),

    [types.CREATE_NEWSLETTER]: state => elementCreateStart(state),
    [types.CREATE_NEWSLETTER_FAILED]: state => elementCreateFail(state),
    [types.CREATE_NEWSLETTER_SUCCEEDED]: state => elementCreateSuccess(state),
  },
  initialState,
);
