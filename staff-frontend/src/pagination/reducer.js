import { handleActions } from 'redux-actions';
import * as types from './constants';

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
