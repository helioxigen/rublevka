import * as types from '../constants/pagination';

import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions(
  {
    [types.UPDATE_PAGINATION]: (state, { resource, pagination }) => ({
      ...state,
      [resource]: {
        ...state[resource],
        ...pagination,
      },
    }),
  },
  initialState,
);
