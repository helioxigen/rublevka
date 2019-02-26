import {
  uploadElementPhoto,
  uploadElementPhotoStarted,
  uploadElementPhotoFailed,
  uploadElementPhotoSucceeded,
} from 'core/fetcher/actions';

import * as types from 'core/constants/selections/actions';
import { resourceName } from 'core/constants/selections/defaults';

const uploadSelectionPhoto = (id, data) => dispatch => {
  dispatch(uploadElementPhotoStarted(types.UPLOAD_SELECTION_PHOTO, id));

  return uploadElementPhoto(resourceName, id, data).then(
    ({ photoId }) => {
      dispatch(
        uploadElementPhotoSucceeded(
          types.UPLOAD_SELECTION_PHOTO_SUCCEEDED,
          id,
          photoId,
        ),
      );

      return Promise.resolve(data);
    },
    (errors, status) => {
      dispatch(
        uploadElementPhotoFailed(
          types.UPLOAD_SELECTION_PHOTO_FAILED,
          id,
          errors,
        ),
      );

      return Promise.reject({ errors, status });
    },
  );
};

export default uploadSelectionPhoto;
