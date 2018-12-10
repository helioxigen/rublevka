import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/requests/search/actions';

const initialState = {};

export default handleActions({
  [types.LOAD_LEADS]: (state, { searchRequestId }) => ({
    ...state,
    [searchRequestId]: {
      isFetching: true,
    },
  }),

  [types.LOAD_LEADS_FAIL]: (state, { searchRequestId, errors }) => ({
    ...state,
    [searchRequestId]: {
      errors,
    },
  }),

  [types.LOAD_LEADS_SUCCESS]: (state, { searchRequestId, items }) => ({
    ...state,
    [searchRequestId]: {
      items,
    },
  }),

  [types.LOAD_LEAD_SUCCESS]: (state, { searchRequestId, id, data }) => ({
    ...state,
    [searchRequestId]: {
      ...state[searchRequestId],
      [id]: {
        data,
      },
    },
  }),

  [types.LOAD_LEAD_FAIL]: (state, { searchRequestId, id, errors }) => ({
    ...state,
    [searchRequestId]: {
      ...state[searchRequestId],
      [id]: {
        errors,
      },
    },
  }),
}, initialState);
