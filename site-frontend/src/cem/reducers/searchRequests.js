import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/requests/search/actions';

const initialState = {
  list: {
    new: {},
    assigned: {},
    inProgress: {},
    done: {},
    approved: {},
  },
};

export default handleActions({
  [types.LOAD_SEARCH_REQUESTS]: (state, { key }) => ({
    ...state,
    list: {
      ...state.list,
      [key]: {
        isFetching: true,
      },
    },
  }),

  [types.LOAD_SEARCH_REQUESTS_FAIL]: (state, { key, errors }) => ({
    ...state,
    list: {
      ...state.list,
      [key]: {
        errors,
      },
    },
  }),

  [types.LOAD_SEARCH_REQUESTS_SUCCESS]: (state, { key, items }) => ({
    ...state,
    list: {
      ...state.list,
      [key]: {
        items: [
          ...(!!state.list[key].items || []),
          ...items,
        ],
      },
    },
  }),

  [types.CREATE_SEARCH_REQUEST_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.LOAD_SEARCH_REQUEST]: (state, { id }) => ({
    ...state,
    [id]: {
      ...state[id] || {},
      isFetching: true,
    },
  }),

  [types.LOAD_SEARCH_REQUEST_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.LOAD_SEARCH_REQUEST_FAIL]: (state, { id, errors }) => ({
    ...state,
    [id]: {
      errors,
    },
  }),
}, initialState);
