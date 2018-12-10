import * as types from 'core/constants/order';

import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({
  [types.UPDATE_ORDER]: (state, { resource, field, predicate }) => ({
    ...state,
    [resource]: {
      field,
      predicate,
    },
  }),

  [types.RESET_ORDER]: (state, { resource }) => ({
    ...state,
    [resource]: {},
  }),
}, initialState);
