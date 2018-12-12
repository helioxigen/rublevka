import { handleActions } from 'redux-actions';

import * as types from 'core/stats/constants/actions';

const initialState = {};

export default handleActions({
  [types.LOAD_SUCCEEDED]: (state, { data }) => ({
    ...state,
    ...data,
  }),

}, initialState);
