import * as types from 'core/constants/favorites';

import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.TOGGLE_FAVORITE]: (state, { id }) => {
      if (state.includes(id)) {
        return state.filter(item => item !== id);
      }
      return [...state, id];
    },
  },
  initialState,
);
