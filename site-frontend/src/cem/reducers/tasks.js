import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/tasks/actions';

import keyBy from 'lodash/keyBy';

const initialState = {
  lists: {
    today: {
      ids: [],
    },
    overdue: {
      ids: [],
    },
    tomorrow: {
      ids: [],
    },
  },
  stats: {},
};

export default handleActions({
  [types.LOAD_TASK_SUCCESS]: (state, { data }) => ({
    ...state,
    [data.id]: {
      data,
    },
  }),

  [types.LOAD_TASKS]: (state, { kind, appendResult }) => ({
    ...state,
    lists: {
      ...state.lists,
      [kind]: {
        ...(appendResult ? state.lists[kind] : {}),
        isFetching: true,
      },
    },
  }),

  [types.LOAD_TASKS_FAIL]: (state, { kind, errors }) => ({
    ...state,
    lists: {
      ...state.lists,
      [kind]: {
        errors,
      },
    },
  }),

  [types.LOAD_TASKS_SUCCESS]: (state, { kind, items, appendResult }) => ({
    ...state,
    lists: {
      ...state.lists,
      [kind]: {
        ids: appendResult ? [...state.lists[kind].ids, ...items.map(item => item.id)] : items.map(item => item.id),
      },
    },
    ...keyBy(items, 'id'),
  }),

  [types.LOAD_STATS_SUCCESS]: (state, { kind, data }) => ({
    ...state,
    stats: {
      ...state.stats,
      [kind]: data,
    },
  }),
}, initialState);
