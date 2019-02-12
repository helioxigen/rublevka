import { API } from 'core/config/sources';
import * as types from 'cem/constants/requests/images/actions';

import loadImageRequest from './load';

const uploadImagesStarted = (id, images) => ({
  type: types.UPLOAD_IMAGE,
  id,
  images,
});

const uploadImagesSuccess = id => ({
  type: types.UPLOAD_IMAGE_FAIL,
  id,
});

const uploadImagesFailed = (id, { errors }) => ({
  type: types.UPLOAD_IMAGE_FAIL,
  id,
  errors,
});

export default function uploadImages(id, images) {
  return dispatch => {
    dispatch(uploadImagesStarted(id, images));

    return API.post(`/v1/orders/images/${id}/images`, { src: images })
      .then(() => {
        dispatch(uploadImagesSuccess(id));
        return dispatch(loadImageRequest(id));
      })
      .catch(({ body }) => dispatch(uploadImagesFailed(id, body)));
  };
}
