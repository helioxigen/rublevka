import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/settings/divisions/actions';

const initialState = {
  list: {},
};

export default handleActions(
  {
    [types.LOAD_DIVISIONS_SUCCESS]: (state, { items }) => ({
      ...state,
      list: {
        items,
      },
    }),

    [types.LOAD_DIVISIONS_FAIL]: (state, { errors }) => ({
      ...state,
      list: {
        errors,
      },
    }),

    [types.LOAD_DIVISION_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [types.LOAD_DIVISION_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        errors,
      },
    }),
  },
  initialState,
);
