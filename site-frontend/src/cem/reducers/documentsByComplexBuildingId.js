import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/complexBuildings/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_DOCUMENTS_SUCCESS]: (state, { complexBuildingId, items }) => ({
      ...state,
      [complexBuildingId]: items,
    }),
  },
  initialState,
);
