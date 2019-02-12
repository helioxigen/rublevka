import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/comments/actions';

import { groupChildrenComments } from 'cem/helpers/comments';

const initialState = {
  tasks: {},
  imagesRequests: {},
  removalRequests: {},
  searchRequests: {},
  cityProperties: {},

  countryProperties: {},
  complexBuildings: {},
  complexes: {},
  settlements: {},
};

export default handleActions(
  {
    [types.LOAD_COMMENTS_FAIL]: (state, { entityKey, entityId, errors }) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          errors,
        },
      },
    }),

    [types.LOAD_COMMENTS_SUCCESS]: (state, { entityKey, entityId, items }) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          ...(state[entityKey][entityId] || {}),
          activeCommentId: undefined,
          items: {
            ...groupChildrenComments(items).reduce(
              (result, item) => ({
                ...result,
                [item.id]: item,
              }),
              {},
            ),
          },
        },
      },
    }),

    [types.SET_ACTIVE_COMMENT]: (
      state,
      { entityKey, entityId, commentId },
    ) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          ...(state[entityKey][entityId] || {}),
          activeCommentId: commentId,
        },
      },
    }),

    [types.UNSUBSCRIBE_SUCCESS]: (state, { entityKey, entityId }) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          ...(state[entityKey][entityId] || {}),
          subscription: {
            data: {
              ...state[entityKey][entityId].subscription.data,
              status: false,
            },
          },
        },
      },
    }),

    [types.SUBSCRIBE_SUCCESS]: (state, { entityKey, entityId }) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          ...(state[entityKey][entityId] || {}),
          subscription: {
            data: {
              ...state[entityKey][entityId].subscription.data,
              status: true,
            },
          },
        },
      },
    }),

    [types.GET_SUBSCRIPTION_STATUS_SUCCESS]: (
      state,
      { entityKey, entityId, data },
    ) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          ...(state[entityKey][entityId] || {}),
          subscription: {
            data,
          },
        },
      },
    }),

    [types.GET_SUBSCRIPTION_STATUS_FAIL]: (
      state,
      { entityKey, entityId, errors },
    ) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          ...(state[entityKey][entityId] || {}),
          subscription: {
            errors,
          },
        },
      },
    }),
  },
  initialState,
);
