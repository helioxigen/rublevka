import * as types from 'cem/constants/settlements/actions';
import { API } from 'core/config/sources';

export const uploadPhotoStarted = (id, url) => ({
  type: types.UPLOAD_PHOTOS,
  id,
  url,
});

const uploadPhotoFailed = (id, errors) => ({
  type: types.UPLOAD_PHOTOS_FAIL,
  id,
  errors,
});

export default function uploadPhoto(id, src) {
  return dispatch =>
    API.post(`/v1/places/settlements/${id}/images`, { src }).then(
      () => {},
      ({ body }) => {
        dispatch(uploadPhotoFailed(id, body));
        return body;
      },
    );
}
