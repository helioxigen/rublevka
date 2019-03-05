import * as types from 'core/constants/favorites';

import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.TOGGLE_FAVORITE]: (state, { id, dealType }) => {
      if (state.some(item => (item.id === id && item.dealType === dealType))) {
        return state.filter(item => (item.id !== id || item.dealType !== dealType));
      }
      return [...state, { id, dealType }];
    },
  },
  initialState,
);
