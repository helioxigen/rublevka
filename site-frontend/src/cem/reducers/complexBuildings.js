import { handleActions } from 'redux-actions';

import * as types from 'cem/constants/complexBuildings/actions';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_COMPLEX_BUILDING_SUCCESS]: (state, { id, data }) => ({
      ...state,
      [id]: {
        data,
      },
    }),

    [types.LOAD_COMPLEX_BUILDING_FAIL]: (state, { id, errors }) => ({
      ...state,
      [id]: {
        errors,
      },
    }),

    [types.UPLOAD_PHOTO]: (state, { complexBuildingId }) => ({
      ...state,
      [complexBuildingId]: {
        data: {
          ...state[complexBuildingId].data,
          isImageUploading: true,
        },
      },
    }),

    [types.UPLOAD_PHOTO_FAIL]: (state, { complexBuildingId }) => ({
      ...state,
      [complexBuildingId]: {
        data: {
          ...state[complexBuildingId].data,
          isImageUploading: false,
          isImageUploadingSucceeded: false,
        },
      },
    }),

    [types.UPLOAD_PHOTO_SUCCESS]: (state, { complexBuildingId }) => ({
      ...state,
      [complexBuildingId]: {
        data: {
          ...state[complexBuildingId].data,
          isImageUploading: false,
          isImageUploadingSucceeded: true,
        },
      },
    }),
  },
  initialState,
);
