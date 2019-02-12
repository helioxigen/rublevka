import { handleActions } from 'redux-actions';

import {
  linkedListLoadStart,
  linkedListLoadFail,
  linkedListLoadSuccess,
} from 'core/fetcher/reducers';

import * as types from 'cem/constants/settlements/actions';
import * as linkedContactTypes from 'cem/constants/linked_contacts/actions';

const resourceName = 'settlements';

const initialState = {
  list: {
    pagination: {},
  },
};

export default handleActions(
  {
    [types.LOAD_SETTLEMENTS]: state => ({
      ...state,
      list: {
        ...state.list,
        isFetching: true,
      },
    }),

    [types.LOAD_SETTLEMENTS_SUCCESS]: (state, { items }) => ({
      ...state,
      list: {
        items,
      },
    }),

    [types.CREATE_SETTLEMENT_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: { data },
    }),

    [types.LOAD_SETTLEMENTS_FAIL]: (state, { errors }) => ({
      ...state,
      list: {
        errors,
      },
    }),

    [types.CHANGE_LOCATION]: (state, { id, location }) => ({
      ...state,
      [id]: {
        data: {
          ...state[id].data,
          location: {
            ...state[id].data.location,
            ...location,
          },
        },
      },
    }),

    [types.LOAD_SETTLEMENT_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: { data },
    }),

    [types.LOAD_SETTLEMENT_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: { errors },
    }),

    [types.UPLOAD_PHOTOS]: (state, { id }) => ({
      ...state,
      [id]: {
        data: {
          ...state[id].data,
          isImageUploading: true,
        },
      },
    }),

    [linkedContactTypes.LOAD_LINKED_LIST]: (
      state,
      { resource, resourceId, listName, resetState },
    ) => {
      if (resource === resourceName) {
        return linkedListLoadStart(state, resourceId, listName, resetState);
      }
      return state;
    },

    [linkedContactTypes.LOAD_LINKED_LIST_SUCCESS]: (
      state,
      { resource, resourceId, listName, items },
    ) => {
      if (resource === resourceName) {
        return linkedListLoadSuccess(
          state,
          resourceId,
          listName,
          items,
          'linkedContactId',
        );
      }
      return state;
    },

    [linkedContactTypes.LOAD_LINKED_LIST_FAIL]: (
      state,
      { resource, resourceId, listName, errors },
    ) => {
      if (resource === resourceName) {
        return linkedListLoadFail(state, resourceId, listName, errors);
      }
      return state;
    },
  },
  initialState,
);
