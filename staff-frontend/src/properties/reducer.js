import { handleActions } from 'redux-actions';
import { getPropertySuccess } from './actionTypes';
import defaultState from './defaultState';

export default handleActions(
  {
    [getPropertySuccess](state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  defaultState,
);
