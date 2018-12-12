import { handleActions } from 'redux-actions';

import * as types from 'cem/_reports/constants/actions';
import // listLoadStart,
  // listLoadFail,
  // listLoadSuccess,
  //
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
  'core/fetcher2/reducers';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_FUNNEL]: (state, { group }) => ({
      ...state,
      [group]: {
        isFetching: true,
      },
    }),

    [types.LOAD_FUNNEL_SUCCEEDED]: (state, { group, items }) => ({
      ...state,
      [group]: {
        items,
      },
    }),
  },
  initialState,
);
