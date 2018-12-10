import * as types from 'cem/constants/tasks/actions';
import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({
  [types.LOAD_DOCUMENT]: (state, { taskId }) => ({
    ...state,
    [taskId]: {
      isFetching: true,
    },
  }),

  [types.LOAD_DOCUMENT_SUCCESS]: (state, { taskId, data }) => ({
    ...state,
    [taskId]: {
      data,
    },
  }),

  [types.LOAD_DOCUMENT_FAIL]: (state, { taskId, errors }) => ({
    ...state,
    [taskId]: {
      errors,
    },
  }),

  [types.UPLOAD_DOCUMENT]: (state, { taskId }) => ({
    ...state,
    [taskId]: {
      isUploading: true,
    },
  }),

  [types.UPLOAD_DOCUMENT_FAIL]: (state, { taskId, errors }) => ({
    ...state,
    [taskId]: {
      ...state[taskId],
      errors,
    },
  }),

  [types.ARCHIVE_DOCUMENT_FAIL]: (state, { taskId, errors }) => ({
    ...state,
    [taskId]: {
      ...state[taskId],
      errors,
    },
  }),

  [types.DELETE_DOCUMENT_FAIL]: (state, { taskId, errors }) => ({
    ...state,
    [taskId]: {
      ...state[taskId],
      errors,
    },
  }),

}, initialState);
