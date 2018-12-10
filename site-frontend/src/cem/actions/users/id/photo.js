import { API } from 'core/config/sources';

import * as types from 'cem/constants/users/actions';

import { pop } from 'cem/actions/toastr';
import { loadUser } from './load';

const uploadPhotoStarted = userId => ({
  type: types.UPLOAD_PHOTO,
  userId,
});

const uploadPhotoFailed = (userId, status) => (dispatch) => {
  if (status === 304) {
    dispatch(pop('info', 'Такая фотография уже существует'));
  }

  dispatch({
    type: types.UPLOAD_PHOTO_FAIL,
    userId,
  });
};

const uploadPhotoSucceeded = (userId, id) => (dispatch) => {
  dispatch(loadUser(userId));
  dispatch(pop('success', 'Фотография обновлена'));

  return dispatch({
    type: types.UPLOAD_PHOTO_SUCCESS,
    userId,
    id,
  });
};

const uploadPhoto = (userId, src) => (dispatch) => {
  dispatch(uploadPhotoStarted(userId));

  return API.post(`/v1/users/staff/${userId}/photo`, { src }).then(
    ({ body: { id } }) => dispatch(uploadPhotoSucceeded(userId, id)),
    ({ status, body }) => {
      dispatch(uploadPhotoFailed(userId, status));

      return body;
    },
  );
};

export default uploadPhoto;
