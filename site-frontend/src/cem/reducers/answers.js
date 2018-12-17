import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/csi/actions';

const initialState = {
  image: {},
  selection: {},
};

export default handleActions(
  {
    [types.LOAD_ANSWERS]: (state, { requestId, kind }) => ({
      ...state,
      [kind]: {
        ...state[kind],
        [requestId]: { isFetching: true },
      },
    }),

    [types.LOAD_ANSWERS_SUCCESS]: (state, { requestId, answers, kind }) => ({
      ...state,
      [kind]: {
        ...state[kind],
        [requestId]: { items: answers },
      },
    }),
  },
  initialState,
);
