import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/leads/actions';

const initialState = {
  list: {},
  lists: {
    noTasks: {
      ids: [],
    },
    new: {
      ids: [],
    },
  },
};

export default handleActions({
  [types._LOAD_LEADS]: (state, { kind, appendResult }) => ({
    ...state,
    lists: {
      ...state.lists,
      [kind]: {
        ...(appendResult ? state.lists[kind] : {}),
        isFetching: true,
      },
    },
  }),

  [types._LOAD_LEADS_FAIL]: (state, { kind, errors }) => ({
    ...state,
    lists: {
      ...state.lists,
      [kind]: {
        errors,
      },
    },
  }),

  [types._LOAD_LEADS_SUCCESS]: (state, { kind, items, appendResult }) => ({
    ...state,
    lists: {
      ...state.lists,
      [kind]: {
        ids: appendResult ? [...state.lists[kind].ids, ...items.map(item => item.id)] : items.map(item => item.id),
      },
    },
    ...items.reduce((result, item) => ({ ...result, [item.id]: { data: item } }), {}),
  }),

  [types.LOAD_LEADS]: state => ({
    ...state,
    list: {
      isFetching: true,
    },
  }),

  [types.LOAD_LEADS_SUCCESS]: (state, { items }) => ({
    ...state,
    list: {
      items,
    },
    ...items.reduce((result, item) => ({ ...result, [item.id]: { data: item } }), {}),
  }),

  [types.LOAD_LEADS_FAIL]: (state, { errors }) => ({
    ...state,
    list: {
      errors,
    },
  }),

  [types.LOAD_LEAD_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: { data },
  }),

  [types.LOAD_LEAD_ERROR]: (state, { id, errors }) => ({
    ...state,
    [id]: { errors },
  }),

  [types.CREATE_LEAD_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: { data },
  }),
}, initialState);
