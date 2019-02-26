import { handleActions } from 'redux-actions';

import * as types from 'core/constants/selections/actions';

import * as reducers from 'core/fetcher/reducers';

const initialState = {};

export default handleActions(
  {
    [types.LOAD_SELECTIONS]: (state, { group }) =>
      reducers.listLoadStart(state, group),
    [types.LOAD_SELECTIONS_FAILED]: (state, { group, errors }) =>
      reducers.listLoadFail(state, group, errors),
    [types.LOAD_SELECTIONS_SUCCEEDED]: (state, { group, items }) =>
      reducers.listLoadSuccess(state, group, items),

    [types.LOAD_SELECTION]: (state, { id }) =>
      reducers.elementLoadStart(state, id),
    [types.LOAD_SELECTION_FAILED]: (state, { id, errors }) =>
      reducers.elementLoadFail(state, id, errors),
    [types.LOAD_SELECTION_SUCCEEDED]: (state, { id, data }) =>
      reducers.elementLoadSuccess(state, id, data),

    [types.CREATE_SELECTION]: state => reducers.elementCreateStart(state),
    [types.CREATE_SELECTION_FAILED]: state => reducers.elementCreateFail(state),
    [types.CREATE_SELECTION_SUCCEEDED]: state =>
      reducers.elementCreateSuccess(state),

    [types.UPDATE_SELECTION]: state => reducers.elementUpdateStart(state),
    [types.UPDATE_SELECTION_FAILED]: state => reducers.elementUpdateFail(state),
    [types.UPDATE_SELECTION_SUCCEEDED]: state =>
      reducers.elementUpdateSuccess(state),

    [types.UPLOAD_SELECTION_PHOTO]: (state, { id }) =>
      reducers.elementPhotoUploadStart(state, id),
    [types.UPLOAD_SELECTION_PHOTO_FAILED]: (state, { id, errors }) =>
      reducers.elementPhotoUploadFail(state, id, errors),
    [types.UPLOAD_SELECTION_PHOTO_SUCCEEDED]: (state, { id, photoId }) =>
      reducers.elementPhotoUploadSuccess(state, id, photoId),
  },
  initialState,
);
