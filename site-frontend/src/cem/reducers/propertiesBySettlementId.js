import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/settlements/actions';

const initialState = {
  primary: {},
  secondary: {},
};

export default handleActions({
  [types.LOAD_PROPERTIES_SUCCESS]: (state, { saleType, id, items }) => ({
    ...state,
    [saleType]: {
      ...state[saleType],
      [id]: {
        items,
      },
    },
  }),

  [types.LOAD_PROPERTIES_FAIL]: (state, { saleType, id, errors }) => ({
    ...state,
    [saleType]: {
      ...state[saleType],
      [id]: {
        errors,
      },
    },
  }),
}, initialState);
