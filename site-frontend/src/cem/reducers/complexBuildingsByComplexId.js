import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/complexBuildings/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_COMPLEX_BUILDINGS]: (state, { complexId }) => ({
      ...state,
      [complexId]: {
        isFetching: true,
      },
    }),

    [types.LOAD_COMPLEX_BUILDINGS_SUCCESS]: (state, { complexId, items }) => ({
      ...state,
      [complexId]: {
        items,
      },
    }),

    [types.LOAD_COMPLEX_BUILDINGS_FAIL]: (state, { complexId, errors }) => ({
      ...state,
      [complexId]: {
        errors,
      },
    }),
  },
  initialState,
);
