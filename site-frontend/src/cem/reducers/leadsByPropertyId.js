import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/properties/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_LEADS]: (state, { propertyId }) => ({
      ...state,
      [propertyId]: {
        isFetching: true,
      },
    }),

    [types.LOAD_LEADS_FAIL]: (state, { propertyId, errors }) => ({
      ...state,
      [propertyId]: {
        errors,
      },
    }),

    [types.LOAD_LEADS_SUCCESS]: (state, { propertyId, items }) => ({
      ...state,
      [propertyId]: {
        items,
      },
    }),
  },
  initialState,
);
