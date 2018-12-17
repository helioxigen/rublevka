import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/contacts';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_LEADS]: (state, { lookupValue }) => ({
      ...state,
      [lookupValue]: {
        isFetching: true,
      },
    }),

    [types.LOAD_LEADS_FAIL]: (state, { lookupValue, errors }) => ({
      ...state,
      [lookupValue]: {
        errors,
      },
    }),

    [types.LOAD_LEADS_SUCCESS]: (state, { lookupValue, items }) => ({
      ...state,
      [lookupValue]: {
        items,
      },
    }),
  },
  initialState,
);
