import { handleActions } from 'redux-actions';

import { groupChildrenComments } from './helpers';
import {
  LOAD_COMMENTS_FAIL,
  LOAD_COMMENTS_SUCCESS,
  SET_ACTIVE_COMMENT,
} from './actions/types';

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
    [LOAD_COMMENTS_FAIL]: (state, { entityKey, entityId, errors }) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          errors,
        },
      },
    }),

    [LOAD_COMMENTS_SUCCESS]: (state, { entityKey, entityId, items }) => ({
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

    [SET_ACTIVE_COMMENT]: (state, { entityKey, entityId, commentId }) => ({
      ...state,
      [entityKey]: {
        ...state[entityKey],
        [entityId]: {
          ...(state[entityKey][entityId] || {}),
          activeCommentId: commentId,
        },
      },
    }),

    // [types.UNSUBSCRIBE_SUCCESS]: (state, { entityKey, entityId }) => ({
    //   ...state,
    //   [entityKey]: {
    //     ...state[entityKey],
    //     [entityId]: {
    //       ...(state[entityKey][entityId] || {}),
    //       subscription: {
    //         data: {
    //           ...state[entityKey][entityId].subscription.data,
    //           status: false,
    //         },
    //       },
    //     },
    //   },
    // }),

    // [types.SUBSCRIBE_SUCCESS]: (state, { entityKey, entityId }) => ({
    //   ...state,
    //   [entityKey]: {
    //     ...state[entityKey],
    //     [entityId]: {
    //       ...(state[entityKey][entityId] || {}),
    //       subscription: {
    //         data: {
    //           ...state[entityKey][entityId].subscription.data,
    //           status: true,
    //         },
    //       },
    //     },
    //   },
    // }),

    // [types.GET_SUBSCRIPTION_STATUS_SUCCESS]: (
    //   state,
    //   { entityKey, entityId, data },
    // ) => ({
    //   ...state,
    //   [entityKey]: {
    //     ...state[entityKey],
    //     [entityId]: {
    //       ...(state[entityKey][entityId] || {}),
    //       subscription: {
    //         data,
    //       },
    //     },
    //   },
    // }),

    // [types.GET_SUBSCRIPTION_STATUS_FAIL]: (
    //   state,
    //   { entityKey, entityId, errors },
    // ) => ({
    //   ...state,
    //   [entityKey]: {
    //     ...state[entityKey],
    //     [entityId]: {
    //       ...(state[entityKey][entityId] || {}),
    //       subscription: {
    //         errors,
    //       },
    //     },
    //   },
    // }),
  },
  initialState,
);
