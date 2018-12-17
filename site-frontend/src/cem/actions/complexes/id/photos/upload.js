import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexes/actions';

export const uploadPhotoStarted = (complexId, url) => ({
  type: types.UPLOAD_PHOTO,
  complexId,
  url,
});

const uploadPhotoFailed = (complexId, errors) => ({
  type: types.UPLOAD_PHOTO_FAIL,
  complexId,
  errors,
});

const uploadPhoto = (complexId, src) => dispatch =>
  API.post(`/v1/complexes/${complexId}/images`, { src }).then(
    () => {},
    ({ body }) => {
      dispatch(uploadPhotoFailed(complexId, body));
      return body;
    },
  );

export default uploadPhoto;
