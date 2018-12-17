import { API } from 'core/config/sources';

import * as types from 'cem/constants/complexBuildings/actions';

export const uploadPhotoStarted = (complexBuildingId, url) => ({
  type: types.UPLOAD_PHOTO,
  complexBuildingId,
  url,
});

const uploadPhotoFailed = (complexBuildingId, errors) => ({
  type: types.UPLOAD_PHOTO_FAIL,
  complexBuildingId,
  errors,
});

const uploadPhoto = (complexBuildingId, src) => dispatch =>
  API.post(`/v1/complex_buildings/${complexBuildingId}/images`, { src }).then(
    () => {},
    ({ body }) => {
      dispatch(uploadPhotoFailed(complexBuildingId, body));
      return body;
    },
  );

export default uploadPhoto;
