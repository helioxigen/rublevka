import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/requests/images/actions';

const initialState = {
  list: {
    new: {},
    inProgress: {},
    originatorApproval: {},
    managerApproval: {},
  },
};

export default handleActions(
  {
    [types.LOAD_IMAGES_REQUESTS]: (state, { key }) => ({
      ...state,
      list: {
        ...state.list,
        [key]: {
          isFetching: true,
          items: (state.list[key] || {}).items || [],
        },
      },
    }),

    [types.LOAD_IMAGES_REQUESTS_FAIL]: (state, { key, errors }) => ({
      ...state,
      list: {
        ...state.list,
        [key]: {
          errors,
          items: (state.list[key] || {}).items || [],
        },
      },
    }),

    [types.LOAD_IMAGES_REQUESTS_SUCCESS]: (state, { key, items, isResultAppended }) => ({
      ...state,
      list: {
        ...state.list,
        [key]: {
          items: isResultAppended ? [...((state.list[key] || {}).items || []), ...items] : items,
        },
      },
    }),

    [types.UPLOAD_IMAGE]: (state, { id }) => ({
      ...state,
      [id]: {
        ...state[id],
        isUploading: true,
      },
    }),

    [types.UPLOAD_IMAGE_SUCCESS]: (state, { id }) => ({
      ...state,
      [id]: {
        ...state[id],
        isUploading: false,
      },
    }),

    [types.UPLOAD_IMAGE_FAIL]: (state, { id }) => ({
      ...state,
      [id]: {
        ...state[id],
        isUploading: false,
      },
    }),

    [types.CREATE_IMAGES_REQUEST_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [types.LOAD_IMAGE_REQUEST_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [types.LOAD_IMAGE_REQUEST_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        errors,
      },
    }),
  },
  initialState,
);
