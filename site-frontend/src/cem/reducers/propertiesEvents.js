import * as types from 'cem/constants/properties/actions';

import { handleActions } from 'redux-actions';

const initialState = {
  property_pdf_export: {},
  property_updated: {},
};

export default handleActions({
  [types.LOAD_EVENTS]: (state, { id, eventKind }) => ({
    ...state,
    [eventKind]: {
      ...state[eventKind],
      [id]: {
        isFetching: true,
      },
    },
  }),

  [types.LOAD_EVENTS_FAIL]: (state, { id, eventKind, errors }) => ({
    ...state,
    [eventKind]: {
      ...state[eventKind],
      [id]: {
        errors,
      },
    },
  }),

  [types.LOAD_EVENTS_SUCCESS]: (state, { id, eventKind, items }) => ({
    ...state,
    [eventKind]: {
      ...state[eventKind],
      [id]: {
        items,
      },
    },
  }),
}, initialState);
