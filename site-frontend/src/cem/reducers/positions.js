import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/settings/positions/actions';

const initialState = {
  list: {},
};

export default handleActions({
  [types.LOAD_POSITIONS_SUCCESS]: (state, { items }) => ({
    ...state,
    list: {
      items,
    },
  }),

  [types.LOAD_POSITIONS_FAIL]: (state, { errors }) => ({
    ...state,
    list: {
      errors,
    },
  }),

  [types.LOAD_POSITION_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.LOAD_POSITION_FAIL]: (state, { id, errors }) => ({
    ...state,
    [id]: {
      errors,
    },
  }),
}, initialState);
