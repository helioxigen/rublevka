import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/csi/actions';

const initialState = {
  image: {
    list: {},
  },
  selection: {
    list: {},
  },
  all: {
    list: {},
  },
};

export default handleActions(
  {
    [types.LOAD_QUESTIONS]: (state, { kind }) => ({
      ...state,
      [kind]: {
        list: { isFetching: true },
      },
    }),

    [types.LOAD_QUESTIONS_SUCCESS]: (state, { kind, items }) => ({
      ...state,
      [kind]: {
        list: { items },
      },
    }),

    [types.LOAD_QUESTIONS_FAIL]: (state, { kind, errors }) => ({
      ...state,
      [kind]: {
        list: { errors },
      },
    }),
  },
  initialState,
);
