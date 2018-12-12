import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/properties/actions';

const initialState = {};

export default handleActions({
  [types.LOAD_TASKS_FAIL]: (state, { propertyId, errors }) => ({
    ...state,
    [propertyId]: {
      errors,
    },
  }),

  [types.LOAD_TASKS_SUCCESS]: (state, { propertyId, items, pagination }) => ({
    ...state,
    [propertyId]: {
      items,
      pagination,
    },
  }),

  [types.UPDATE_TASKS_PAGINATION]: (state, { propertyId, pagination }) => ({
    ...state,
    [propertyId]: {
      ...state[propertyId],
      pagination: {
        ...state[propertyId].pagination,
        ...pagination,
      },
    },
  }),
}, initialState);
