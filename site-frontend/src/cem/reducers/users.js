import { handleActions } from 'redux-actions';
import * as types from 'cem/constants/users/actions';

const initialState = {
  list: {},
  documentsByUserId: {},
  subordinateUsersByUserId: {},
};

export default handleActions({
  [types.LOAD_LIST]: state => ({
    ...state,
    list: {
      isFetching: true,
    },
  }),

  [types.LOAD_LIST_SUCCESS]: (state, { items }) => ({
    ...state,
    list: {
      items,
    },
    ...items.reduce((result, item) => ({
      ...result,
      [item.id]: {
        data: item,
      },
    }), {}),
  }),

  [types.LOAD_LIST_FAIL]: (state, { errors }) => ({
    ...state,
    list: {
      errors,
    },
  }),

  [types.LOAD_SUBORDINATE_USERS]: (state, { id }) => ({
    ...state,
    subordinateUsersByUserId: {
      [id]: {
        isFetching: true,
      },
    },
  }),

  [types.LOAD_SUBORDINATE_USERS_SUCCESS]: (state, { id, items }) => ({
    ...state,
    ...items.reduce((result, item) => ({
      ...result,
      [item.id]: {
        data: item,
      },
    }), {}),
    subordinateUsersByUserId: {
      [id]: {
        ids: [...items.map(item => item.id)],
      },
    },
  }),

  [types.LOAD_SUBORDINATE_USERS_FAIL]: (state, { id, errors }) => ({
    ...state,
    subordinateUsersByUserId: {
      [id]: {
        errors,
      },
    },
  }),

  // Commented until better times
  // [types.LOAD_ID]: (state, { id }) => ({
  //   ...state,
  //   [id]: {
  //     isFetching: true,
  //   },
  // }),

  [types.LOAD_ID_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.LOAD_DOCUMENTS]: (state, { id }) => ({
    ...state,
    documentsByUserId: {
      [id]: {
        isFetching: true,
      },
    },
  }),

  [types.LOAD_DOCUMENTS_SUCCESS]: (state, { id, items }) => ({
    ...state,
    documentsByUserId: {
      [id]: {
        items,
      },
    },
  }),

  [types.LOAD_DOCUMENTS_FAIL]: (state, { id, errors }) => ({
    ...state,
    documentsByUserId: {
      [id]: {
        errors,
      },
    },
  }),

  [types.UPLOAD_PHOTO]: (state, { userId }) => ({
    ...state,
    [userId]: {
      ...state[userId],
      isPhotoUploading: true,
    },
  }),

  [types.UPLOAD_PHOTO_FAIL]: (state, { userId }) => ({
    ...state,
    [userId]: {
      ...state[userId],
      isPhotoUploading: false,
    },
  }),

  [types.UPLOAD_PHOTO_SUCCESS]: (state, { userId }) => ({
    ...state,
    [userId]: {
      ...state[userId],
      isPhotoUploading: false,
    },
  }),
}, initialState);
