import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/requests/remove/actions';

const initialState = {
  list: {
    managerApproval: {},
    hubManagerApproval: {},
  },
};

export default handleActions({
  [types.LOAD_REMOVAL_REQUESTS]: (state, { key }) => ({
    ...state,
    list: {
      ...state.list,
      [key]: {
        isFetching: true,
        items: (state.list[key] || {}).items || [],
      },
    },
  }),

  [types.LOAD_REMOVAL_REQUESTS_FAIL]: (state, { key, errors }) => ({
    ...state,
    list: {
      ...state.list,
      [key]: {
        errors,
        items: (state.list[key] || {}).items || [],
      },
    },
  }),

  [types.LOAD_REMOVAL_REQUESTS_SUCCESS]: (state, { key, items, isResultAppended }) => ({
    ...state,
    list: {
      ...state.list,
      [key]: {
        items: isResultAppended ? [...((state.list[key] || {}).items || []), ...items] : items,
      },
    },
  }),

  [types.CREATE_REMOVAL_REQUEST_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.LOAD_REMOVAL_REQUEST_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.LOAD_REMOVAL_REQUEST_FAIL]: (state, { id, errors }) => ({
    ...state,
    [id]: {
      errors,
    },
  }),
}, initialState);
