import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/deals/actions';

import keyBy from 'lodash/keyBy';

const initialState = {
  lists: {
    noTasks: {
      ids: [],
    },
  },
  stats: {
    agency_fee: {
      toApprove: {},
    },
  },
};

export default handleActions(
  {
    [types.LOAD_DEAL]: (state, { id }) => ({
      ...state,
      [id]: {
        isFetching: true,
      },
    }),

    [types.LOAD_DEAL_SUCCESS]: (state, { data }) => ({
      ...state,
      [data.id]: {
        data,
      },
    }),

    [types.LOAD_DEAL_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        errors,
      },
    }),

    [types.LOAD_DEALS]: (state, { kind, appendResult }) => ({
      ...state,
      lists: {
        ...state.lists,
        [kind]: {
          ...(appendResult ? state.lists[kind] : {}),
          isFetching: true,
        },
      },
    }),

    [types.LOAD_DEALS_FAIL]: (state, { kind, errors }) => ({
      ...state,
      lists: {
        ...state.lists,
        [kind]: {
          errors,
        },
      },
    }),

    [types.LOAD_DEALS_SUCCESS]: (state, { kind, items, appendResult }) => ({
      ...state,
      lists: {
        ...state.lists,
        [kind]: {
          ids: appendResult
            ? [...state.lists[kind].ids, ...items.map(item => item.id)]
            : items.map(item => item.id),
        },
      },
      ...items.reduce((result, item) => ({ ...result, [item.id]: { data: item } }), {}),
    }),

    [types.LOAD_DEALS_LANE]: (state, { kind, reset }) => ({
      ...state,
      [kind]: {
        ...(reset ? {} : state[kind]),
        isFetching: true,
        isComplete: false,
      },
    }),

    [types.LOAD_DEALS_LANE_SUCCESS]: (state, { kind, pagination, items }) => ({
      ...state,
      [kind]: {
        ...state[kind],
        isFetching: false,
        isComplete: true,
        items: [...(state[kind].items || []), ...items],
        pagination,
      },
      ...keyBy(items, 'id'),
    }),

    [types.LOAD_DEALS_LANE_FAIL]: (state, { kind, errors }) => ({
      ...state,
      [kind]: {
        ...state[kind],
        isFetching: false,
        errors,
      },
    }),

    [types.LOAD_DEALS_STATS_FAIL]: (state, { kind, errors, toApproveState }) => {
      const toApproveErrors = toApproveState ? { errors } : {};
      const defaultErrors = !toApproveState ? { errors } : undefined;

      return {
        ...state,
        stats: {
          ...state.stats,
          [kind]: {
            ...(defaultErrors || state.stats[kind]),
            toApprove: {
              ...state.stats[kind].toApprove,
              ...toApproveErrors,
            },
          },
        },
      };
    },

    [types.LOAD_DEALS_STATS_SUCCESS]: (state, { kind, data, toApproveState }) => {
      const toApproveData = toApproveState ? { [toApproveState]: data } : {};
      const defaultData = !toApproveState ? data : undefined;

      return {
        ...state,
        stats: {
          ...state.stats,
          [kind]: {
            ...(defaultData || state.stats[kind]),
            toApprove: {
              ...state.stats[kind].toApprove,
              ...toApproveData,
            },
          },
        },
      };
    },
  },
  initialState,
);
