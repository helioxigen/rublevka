import { handleActions } from 'redux-actions';

import * as types from '../constants/favorites';

const initialState = [];

export default handleActions(
  {
    [types.TOGGLE_FAVORITE]: (state, { id, dealType }) => {
      if (state.some(item => item.id === id && item.dealType === dealType)) {
        return state.filter(
          item => item.id !== id || item.dealType !== dealType,
        );
      }
      return [...state, { id, dealType }];
    },
  },
  initialState,
);
