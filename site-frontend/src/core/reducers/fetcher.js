import { handleActions } from 'redux-actions';
import * as types from 'core/constants/fetcher';

const initialState = {};

export default handleActions({
  [types.LOAD_LIST]: (state, { entityTypeId }) => ({
    ...state,
    [entityTypeId]: {
      ...state[entityTypeId],
      list: {
        ...((state[entityTypeId] || {}).list || {}),
        isFetching: true,
      },
    },
  }),

  [types.LOAD_LIST_SUCCESS]: (state, { entityTypeId, items, append }) => {
    const newItems = append ? [...(state[entityTypeId].list.items || []), ...items] : items;
    return {
      ...state,
      [entityTypeId]: {
        ...state[entityTypeId],
        list: {
          items: newItems,
        },
        ...newItems.reduce((result, item) => ({
          ...result,
          [item.id]: {
            data: item,
          },
        }), {}),
      },
    };
  },

  [types.LOAD_LIST_FAIL]: (state, { entityTypeId, errors }) => ({
    ...state,
    [entityTypeId]: {
      ...state[entityTypeId],
      list: {
        errors,
      },
    },
  }),

  [types.LOAD_LINKED_LIST]: (state, { baseEntityTypeId, entityTypeId }) => ({
    ...state,
    [baseEntityTypeId]: {
      ...state[baseEntityTypeId],
      [entityTypeId]: {
        ...(state[baseEntityTypeId] ? state[baseEntityTypeId][entityTypeId] : {}),
        list: {
          isFetching: true,
        },
      },
    },
  }),

  [types.LOAD_LINKED_LIST_SUCCESS]: (state, { baseEntityTypeId, entityTypeId, items }) => ({
    ...state,
    [baseEntityTypeId]: {
      ...state[baseEntityTypeId],
      [entityTypeId]: {
        ...(state[baseEntityTypeId] ? state[baseEntityTypeId][entityTypeId] : {}),
        list: {
          items,
        },
        ...items.reduce((result, item) => ({
          ...result,
          [item.id]: {
            data: item,
          },
        }), {}),
      },
    },
  }),

  [types.LOAD_LINKED_LIST_FAIL]: (state, { baseEntityTypeId, entityTypeId, errors }) => ({
    ...state,
    [baseEntityTypeId]: {
      ...state[baseEntityTypeId],
      [entityTypeId]: {
        ...(state[baseEntityTypeId] ? state[baseEntityTypeId][entityTypeId] : {}),
        list: {
          errors,
        },
      },
    },
  }),

  [types.LOAD_ID_SUCCESS]: (state, { entityTypeId, id, data }) => ({
    ...state,
    [entityTypeId]: {
      ...state[entityTypeId],
      [id]: data,
    },
  }),
}, initialState);
