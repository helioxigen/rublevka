import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/leadSources';

const initialState = { list: {} };

export default handleActions(
  {
    [types.LOAD_LEAD_SOURCE_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        errors,
      },
    }),

    [types.LOAD_LEAD_SOURCE_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [types.LOAD_LEAD_SOURCES]: state => ({
      ...state,
      list: {
        isFetching: true,
      },
    }),

    [types.LOAD_LEAD_SOURCES_SUCCESS]: (state, { items }) => ({
      ...state,
      list: { items },
    }),

    [types.LOAD_LEAD_SOURCES_FAIL]: (state, { errors }) => ({
      ...state,
      list: { errors },
    }),
  },
  initialState,
);
