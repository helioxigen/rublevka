import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/complexes/actions';

const initialState = {
  list: {},
};

export default handleActions({
  [types.LOAD_COMPLEXES]: state => ({
    ...state,
    list: {
      isFetching: true,
    },
  }),

  [types.LOAD_COMPLEXES_SUCCESS]: (state, { items }) => ({
    ...state,
    list: {
      items,
    },
  }),

  [types.LOAD_COMPLEXES_FAIL]: (state, { errors }) => ({
    ...state,
    list: {
      errors,
    },
  }),

  [types.LOAD_COMPLEX_SUCCESS]: (state, { id, data }) => ({
    ...state,
    [id]: {
      data,
    },
  }),

  [types.LOAD_COMPLEX_FAIL]: (state, { id, errors }) => ({
    ...state,
    [id]: {
      errors,
    },
  }),

  [types.UPLOAD_PHOTO]: (state, { complexId }) => ({
    ...state,
    [complexId]: {
      data: {
        ...state[complexId].data,
        isImageUploading: true,
      },
    },
  }),

  [types.UPLOAD_PHOTO_FAIL]: (state, { complexId }) => ({
    ...state,
    [complexId]: {
      data: {
        ...state[complexId].data,
        isImageUploading: false,
        isImageUploadingSucceeded: false,
      },
    },
  }),

  [types.UPLOAD_PHOTO_SUCCESS]: (state, { complexId }) => ({
    ...state,
    [complexId]: {
      data: {
        ...state[complexId].data,
        isImageUploading: false,
        isImageUploadingSucceeded: true,
      },
    },
  }),
}, initialState);
