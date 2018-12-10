import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/contacts';

const initialState = {};

export default handleActions({
  [types.LOAD_DEALS]: (state, { contactId }) => ({
    ...state,
    [contactId]: {
      isFetching: true,
    },
  }),

  [types.LOAD_DEALS_FAIL]: (state, { contactId, errors }) => ({
    ...state,
    [contactId]: {
      errors,
    },
  }),

  [types.LOAD_DEALS_SUCCESS]: (state, { contactId, items }) => ({
    ...state,
    [contactId]: {
      items,
    },
  }),
}, initialState);
