import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/settlements/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_DOCUMENTS_SUCCESS]: (state, { id, items }) => ({
      ...state,
      [id]: items,
    }),
  },
  initialState,
);
