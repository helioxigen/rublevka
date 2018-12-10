import * as types from 'core/constants/pagination';

import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({
  [types.UPDATE_PAGINATION]: (state, { kind, pagination }) => ({
    ...state,
    [kind]: {
      ...state[kind],
      ...pagination,
    },
  }),
}, initialState);
